import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock, Video, Building2, Camera, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useApp } from '@/contexts/AppContext';
import { sampleDoctors, problemCategories, keySignsOptions, progressionOptions, sampleIntake } from '@/data/sampleData';
import { toast } from 'sonner';

type Step = 'pet' | 'doctor' | 'type' | 'slot' | 'intake' | 'confirm';

export function BookingFlow() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, pets, currentPetId, createAppointment } = useApp();
  
  const [step, setStep] = useState<Step>('pet');
  const [selectedPet, setSelectedPet] = useState(currentPetId || '');
  const [selectedDoctor, setSelectedDoctor] = useState(searchParams.get('doctor') || '');
  const [visitType, setVisitType] = useState<'in-clinic' | 'video'>('in-clinic');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [intake, setIntake] = useState(sampleIntake);

  useEffect(() => {
    if (!isAuthenticated) navigate('/auth');
  }, [isAuthenticated, navigate]);

  const doctor = sampleDoctors.find(d => d.id === selectedDoctor);
  const pet = pets.find(p => p.id === selectedPet);

  const handleNext = () => {
    const steps: Step[] = ['pet', 'doctor', 'type', 'slot', 'intake', 'confirm'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) setStep(steps[currentIndex + 1]);
  };

  const handleBack = () => {
    const steps: Step[] = ['pet', 'doctor', 'type', 'slot', 'intake', 'confirm'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) setStep(steps[currentIndex - 1]);
  };

  const handleSubmit = () => {
    createAppointment({
      id: `apt-${Date.now()}`,
      petId: selectedPet,
      doctorId: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      visitType,
      status: 'pending',
      intake,
      createdAt: new Date().toISOString(),
    });
    toast.success('Appointment booked successfully!');
    navigate('/dashboard');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" size="sm" onClick={handleBack} disabled={step === 'pet'}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <div className="flex gap-2">
            {['pet', 'doctor', 'type', 'slot', 'intake', 'confirm'].map((s, i) => (
              <div key={s} className={`w-2 h-2 rounded-full ${step === s ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
          <div className="w-16" />
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          {step === 'pet' && (
            <Card variant="elevated">
              <CardHeader><CardTitle>Select Pet</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {pets.map(p => (
                  <div key={p.id} onClick={() => setSelectedPet(p.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPet === p.id ? 'border-primary bg-primary-light' : 'border-border'}`}>
                    <div className="flex items-center gap-4">
                      <img src={p.photos[0]} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h3 className="font-bold">{p.name}</h3>
                        <p className="text-sm text-muted-foreground">{p.breed} • {p.age}</p>
                      </div>
                      {selectedPet === p.id && <Check className="ml-auto text-primary" />}
                    </div>
                  </div>
                ))}
                <Button variant="hero" className="w-full" onClick={handleNext} disabled={!selectedPet}>Continue</Button>
              </CardContent>
            </Card>
          )}

          {step === 'doctor' && (
            <Card variant="elevated">
              <CardHeader><CardTitle>Select Doctor</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {sampleDoctors.map(d => (
                  <div key={d.id} onClick={() => setSelectedDoctor(d.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedDoctor === d.id ? 'border-primary bg-primary-light' : 'border-border'}`}>
                    <div className="flex items-center gap-4">
                      <img src={d.avatar} alt={d.name} className="w-14 h-14 rounded-full object-cover" />
                      <div className="flex-1">
                        <h3 className="font-bold">{d.name}</h3>
                        <p className="text-sm text-muted-foreground">{d.clinic}</p>
                      </div>
                      {selectedDoctor === d.id && <Check className="text-primary" />}
                    </div>
                  </div>
                ))}
                <Button variant="hero" className="w-full" onClick={handleNext} disabled={!selectedDoctor}>Continue</Button>
              </CardContent>
            </Card>
          )}

          {step === 'type' && (
            <Card variant="elevated">
              <CardHeader><CardTitle>Visit Type</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[{ type: 'in-clinic', icon: Building2, label: 'In-Clinic Visit' }, { type: 'video', icon: Video, label: 'Video Consultation' }].map(({ type, icon: Icon, label }) => (
                  <div key={type} onClick={() => setVisitType(type as any)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${visitType === type ? 'border-primary bg-primary-light' : 'border-border'}`}>
                    <div className="flex items-center gap-4">
                      <Icon className="w-8 h-8 text-primary" />
                      <span className="font-semibold text-lg">{label}</span>
                      {visitType === type && <Check className="ml-auto text-primary" />}
                    </div>
                  </div>
                ))}
                <Button variant="hero" className="w-full" onClick={handleNext}>Continue</Button>
              </CardContent>
            </Card>
          )}

          {step === 'slot' && doctor && (
            <Card variant="elevated">
              <CardHeader><CardTitle>Select Date & Time</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {doctor.availableSlots.map(slot => (
                  <div key={slot.date}>
                    <p className="font-semibold mb-2">{new Date(slot.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                    <div className="flex flex-wrap gap-2">
                      {slot.times.map(time => (
                        <Badge key={time} variant={selectedDate === slot.date && selectedTime === time ? 'default' : 'outline'}
                          className="cursor-pointer py-2 px-3" onClick={() => { setSelectedDate(slot.date); setSelectedTime(time); }}>
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
                <Button variant="hero" className="w-full" onClick={handleNext} disabled={!selectedTime}>Continue</Button>
              </CardContent>
            </Card>
          )}

          {step === 'intake' && (
            <Card variant="elevated">
              <CardHeader><CardTitle>Describe the Problem</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Problem Categories</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {problemCategories.slice(0, 8).map(cat => (
                      <Badge key={cat} variant={intake.problemCategories.includes(cat) ? 'default' : 'outline'}
                        className="cursor-pointer" onClick={() => setIntake(prev => ({
                          ...prev, problemCategories: prev.problemCategories.includes(cat)
                            ? prev.problemCategories.filter(c => c !== cat) : [...prev.problemCategories, cat]
                        }))}>{cat}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Severity (1-10): {intake.severity}</Label>
                  <Slider value={[intake.severity]} onValueChange={([v]) => setIntake(prev => ({ ...prev, severity: v }))} max={10} min={1} className="mt-2" />
                </div>
                <div>
                  <Label>Key Signs</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {keySignsOptions.slice(0, 10).map(sign => (
                      <Badge key={sign} variant={intake.keySigns.includes(sign) ? 'default' : 'outline'}
                        className="cursor-pointer text-xs" onClick={() => setIntake(prev => ({
                          ...prev, keySigns: prev.keySigns.includes(sign)
                            ? prev.keySigns.filter(s => s !== sign) : [...prev.keySigns, sign]
                        }))}>{sign}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Additional Notes</Label>
                  <Textarea value={intake.keySignsNotes} onChange={e => setIntake(prev => ({ ...prev, keySignsNotes: e.target.value }))} className="mt-2" />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={intake.consent} onCheckedChange={c => setIntake(prev => ({ ...prev, consent: !!c }))} />
                  <Label className="text-sm">I consent to share this information with the veterinarian</Label>
                </div>
                <Button variant="hero" className="w-full" onClick={handleNext} disabled={!intake.consent}>Review Booking</Button>
              </CardContent>
            </Card>
          )}

          {step === 'confirm' && pet && doctor && (
            <Card variant="elevated">
              <CardHeader><CardTitle>Confirm Booking</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-primary-light space-y-3">
                  <div className="flex justify-between"><span className="text-muted-foreground">Pet:</span><span className="font-semibold">{pet.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Doctor:</span><span className="font-semibold">{doctor.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Date:</span><span className="font-semibold">{selectedDate}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Time:</span><span className="font-semibold">{selectedTime}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Type:</span><span className="font-semibold">{visitType === 'in-clinic' ? 'In-Clinic' : 'Video'}</span></div>
                </div>
                <Button variant="hero" className="w-full" onClick={handleSubmit}>Confirm Booking</Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
