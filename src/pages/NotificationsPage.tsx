import { motion } from 'framer-motion';
import { Bell, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

export function NotificationsPage() {
  const { notifications, markNotificationRead } = useApp();
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        <div className="space-y-3">
          {notifications.map((n, i) => (
            <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card variant={n.read ? 'default' : 'soft'} className="cursor-pointer" onClick={() => markNotificationRead(n.id)}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", n.read ? "bg-muted" : "bg-primary-light")}>
                    <Bell className={cn("w-5 h-5", n.read ? "text-muted-foreground" : "text-primary")} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{n.title}</h3>
                    <p className="text-sm text-muted-foreground">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                  </div>
                  {n.read && <CheckCircle className="w-5 h-5 text-success" />}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
