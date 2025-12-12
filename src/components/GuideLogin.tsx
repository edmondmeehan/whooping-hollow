
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Anchor, Mail, KeyRound, Eye, EyeOff, Waves } from 'lucide-react';

interface GuideLoginProps {
  onLogin: (username: string, password: string) => boolean;
}

const GuideLogin = ({ onLogin }: GuideLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const success = onLogin(username, password);
      if (!success) {
        setError('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden pt-20">
      {/* Coastal background with subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-muted" />
      
      {/* Decorative wave pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
        <svg viewBox="0 0 1440 120" className="w-full h-full fill-primary">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <Anchor className="h-16 w-16 text-primary" />
      </div>
      <div className="absolute top-32 right-16 opacity-15">
        <Waves className="h-12 w-12 text-accent" />
      </div>
      
      <Card className="w-full max-w-md mx-4 relative z-10 border-border/50 shadow-[var(--shadow-elegant)] bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          {/* Nautical anchor icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              <div className="relative bg-gradient-to-br from-primary to-primary/80 p-4 rounded-full shadow-lg">
                <Anchor className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
          </div>
          
          <CardTitle className="text-3xl font-serif text-foreground tracking-wide">
            Guest Guide
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2 font-sans">
            Welcome to Whooping Hollow
          </CardDescription>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent" />
            <Waves className="h-4 w-4 text-accent" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent" />
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 pt-4">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Mail className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-11 h-12 bg-background/50 border-border focus:border-primary focus:ring-primary/20 transition-all"
                  disabled={isLoading}
                />
              </div>
              
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <KeyRound className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 pr-11 h-12 bg-background/50 border-border focus:border-primary focus:ring-primary/20 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            {error && (
              <p className="text-sm text-destructive text-center font-medium">{error}</p>
            )}

            {/* Elegant hint box */}
            <div className="bg-secondary/50 border border-border/50 p-4 rounded-lg">
              <p className="text-sm text-foreground font-medium mb-1">Need your credentials?</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your login details were included in your check-in email and can also be found on the WiFi information card at the property.
              </p>
            </div>
          </CardContent>

          <CardFooter className="pt-2 pb-6">
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                "Enter Guest Guide"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default GuideLogin;
