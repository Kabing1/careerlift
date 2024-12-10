import amqp from 'amqplib';

class MessageQueue {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  async connect() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    this.channel = await this.connection.createChannel();
  }

  async publishFeedback(interviewId: string, feedback: any) {
    if (!this.channel) await this.connect();
    
    const queue = 'interview_feedback';
    await this.channel!.assertQueue(queue, { durable: true });
    
    this.channel!.sendToQueue(queue, Buffer.from(JSON.stringify({
      interviewId,
      feedback,
      timestamp: new Date().toISOString()
    })));
  }

  async subscribeFeedback(callback: (feedback: any) => void) {
    if (!this.channel) await this.connect();
    
    const queue = 'interview_feedback';
    await this.channel!.assertQueue(queue, { durable: true });
    
    this.channel!.consume(queue, (msg) => {
      if (msg) {
        const feedback = JSON.parse(msg.content.toString());
        callback(feedback);
        this.channel!.ack(msg);
      }
    });
  }
}

export const messageQueue = new MessageQueue();