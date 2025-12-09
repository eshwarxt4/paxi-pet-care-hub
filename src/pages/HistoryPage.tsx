import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, FileText, Pill, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sampleHistory, sampleDoctors } from '@/data/sampleData';

export function HistoryPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-6">History & Records</motion.h1>
        <div className="space-y-4">
          {sampleHistory.map((record, i) => {
            const doctor = sampleDoctors.find(d => d.id === record.doctorId);
            return (
              <motion.div key={record.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card variant="interactive">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${record.status === 'completed' ? 'bg-success-light' : 'bg-accent-light'}`}>
                        {record.prescription ? <Pill className="w-6 h-6 text-success" /> : <FileText className="w-6 h-6 text-accent" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{record.type}</h3>
                        <p className="text-sm text-muted-foreground">{record.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(record.date).toLocaleDateString()} {doctor && `• ${doctor.name}`}</p>
                      </div>
                      <Badge variant={record.status === 'completed' ? 'success' : 'warning'}>{record.status}</Badge>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
