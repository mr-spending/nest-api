import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WebSocketMessageEnum } from 'src/shared/enums/enums';

@WebSocketGateway({ cors: true })
export class MessageGateway {

  constructor() {}

  @WebSocketServer() server: Server;  
  private logger: Logger = new Logger('MessageGateway');

  @SubscribeMessage('message')
  handleEvent(client: Socket, message: string): void {
    this.logger.log("messageJoin");
    client.join(WebSocketMessageEnum.NewTransaction);
    this.server.emit('newTransaction', message)
  }
  
  afterInit() {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
