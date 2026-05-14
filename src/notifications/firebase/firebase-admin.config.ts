import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

let initialized = false;

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (projectId) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey) {
      try {
        const serviceAccount: Record<string, string | undefined> = {
          type: 'service_account',
          project_id: projectId,
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
          private_key: privateKey.replace(/\\n/g, '\n'),
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_CLIENT_ID,
          auth_uri: 'https://accounts.google.com/o/oauth2/auth',
          token_uri: 'https://oauth2.googleapis.com/token',
          auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
          client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
          universe_domain: 'googleapis.com',
        };
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
          projectId,
        });
        initialized = true;
        console.log('[Firebase] Initialized with private key.');
      } catch (e) {
        console.warn('[Firebase] Failed to initialize with private key:', (e as Error).message);
      }
    } else {
      const fileName = process.env.FIREBASE_SERVICE_ACCOUNT_FILE;
      if (fileName) {
        const paths = [
          path.join(__dirname, fileName),
          path.join(process.cwd(), 'src', 'notifications', 'firebase', fileName),
        ];
        let foundPath: string | null = null;
        for (const p of paths) {
          if (fs.existsSync(p)) { foundPath = p; break; }
        }
        if (foundPath) {
          try {
            const sa = JSON.parse(fs.readFileSync(foundPath, 'utf8'));
            admin.initializeApp({ credential: admin.credential.cert(sa), projectId });
            initialized = true;
            console.log('[Firebase] Initialized with file.');
          } catch (e) {
            console.warn('[Firebase] Failed to initialize with file:', (e as Error).message);
          }
        } else {
          console.warn('[Firebase] File not found.');
        }
      } else {
        console.warn('[Firebase] No credentials configured.');
      }
    }
  } else {
    console.warn('[Firebase] FIREBASE_PROJECT_ID not set.');
  }
}

export { admin as firebaseAdmin };

export const messaging = initialized
  ? admin.messaging()
  : null;
