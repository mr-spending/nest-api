import { Server } from 'http';
import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  private server: any;

  constructor(app: INestApplication) {
    super(app);
  }

  createIOServer(port: number, options?: socketio.ServerOptions): any {
    const server = super.createIOServer(port, options);

    this.server = server;

    return server;
  }

  bindClientConnect(server: socketio.Server, callback: (...args: any[]) => void) {
    server.on('connection', (socket: socketio.Socket) => {
      callback(socket);
    });
  }

  public getInstance(): any {
    return this.server;
  }
}
