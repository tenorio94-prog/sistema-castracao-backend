import { Injectable } from '@nestjs/common';
import { messaging } from './firebase/firebase-admin.config';

export interface NotificationData {
  token?: string;
  topic?: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  imageUrl?: string;
}

function assertMessaging(): NonNullable<typeof messaging> {
  if (!messaging) {
    throw new Error('[Firebase] Messaging not available. Configure Firebase credentials in .env');
  }
  return messaging;
}

@Injectable()
export class NotificationHandler {
  async sendNotification(notificationData: NotificationData) {
    const { token, topic, title, body, data, imageUrl } = notificationData;

    if (!token && !topic) {
      throw new Error('Token ou tópico deve ser fornecido');
    }

    const message: any = {
      notification: {
        title,
        body,
      },
      data: data || {},
    };

    if (imageUrl) {
      message.notification.imageUrl = imageUrl;
    }

    if (token) {
      message.token = token;
    } else if (topic) {
      message.topic = topic.startsWith('/topics/') ? topic : `/topics/${topic}`;
    }

    try {
      const fb = assertMessaging();
      const response = await fb.send(message);
      return { success: true, messageId: response };
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      throw error;
    }
  }

  async sendMulticast(tokens: string[], title: string, body: string, data?: Record<string, string>) {
    if (tokens.length === 0) {
      return { successCount: 0, failureCount: 0, failedTokens: [] };
    }

    try {
      const fb = assertMessaging();
      const response = await fb.sendEachForMulticast({
        notification: { title, body },
        data: data || {},
        tokens,
      });

      const failedTokens: string[] = [];
      if (response.failureCount > 0) {
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(tokens[idx]);
          }
        });
      }

      return {
        successCount: response.successCount,
        failureCount: response.failureCount,
        failedTokens,
      };
    } catch (error) {
      console.error('Erro ao enviar multicast:', error);
      throw error;
    }
  }

  async subscribeToTopic(token: string, topic: string) {
    try {
      const fb = assertMessaging();
      await fb.subscribeToTopic(token, topic);
      return { success: true };
    } catch (error) {
      console.error(`Erro ao inscrever no tópico ${topic}:`, error);
      throw error;
    }
  }

  async unsubscribeFromTopic(token: string, topic: string) {
    try {
      const fb = assertMessaging();
      await fb.unsubscribeFromTopic(token, topic);
      return { success: true };
    } catch (error) {
      console.error(`Erro ao desinscrever do tópico ${topic}:`, error);
      throw error;
    }
  }

  async subscribeToTopics(tokens: string[], topic: string) {
    try {
      const fb = assertMessaging();
      await fb.subscribeToTopic(tokens, topic);
      return { success: true };
    } catch (error) {
      console.error(`Erro ao inscrever tokens no tópico ${topic}:`, error);
      throw error;
    }
  }

  async unsubscribeFromTopics(tokens: string[], topic: string) {
    try {
      const fb = assertMessaging();
      await fb.unsubscribeFromTopic(tokens, topic);
      return { success: true };
    } catch (error) {
      console.error(`Erro ao desinscrever tokens do tópico ${topic}:`, error);
      throw error;
    }
  }
}
