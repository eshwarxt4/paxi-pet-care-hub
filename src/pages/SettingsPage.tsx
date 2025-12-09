import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Bell, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

export function SettingsPage() {
  const { owner, updateOwner, logout } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: owner?.name || '', email: owner?.email || '', phone: owner?.phone || '' });
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false });

  const handleSave = () => { if (owner) updateOwner({ ...owner, ...formData }); toast.success('Settings saved!'); };
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="elevated">
            <CardHeader><CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> Profile</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Full Name</Label><Input value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="mt-1" /></div>
              <div><Label>Email</Label><Input value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="mt-1" /></div>
              <div><Label>Phone</Label><Input value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className="mt-1" /></div>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card variant="elevated">
            <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" /> Notifications</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[{ key: 'email', label: 'Email Notifications' }, { key: 'push', label: 'Push Notifications' }, { key: 'sms', label: 'SMS Notifications' }].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <Label>{label}</Label>
                  <Switch checked={notifications[key as keyof typeof notifications]} onCheckedChange={c => setNotifications(p => ({ ...p, [key]: c }))} />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card variant="elevated">
            <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5" /> Privacy</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Your data is securely stored and only shared with veterinarians you book appointments with. We never sell your personal information.</p>
            </CardContent>
          </Card>
        </motion.div>

        <Button variant="destructive" className="w-full" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
      </div>
    </div>
  );
}
