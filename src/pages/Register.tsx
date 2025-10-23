import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Mail, Lock, User, Building, Github, Chrome } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  username: string;
  jobTitle?: string;
  company?: string;
  experience?: string;
  interests?: string;
  phone?: string;
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegisterFormData>>({});
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const location = useLocation();
  const { register, isLoading, error, clearError, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear step error when user starts typing
    if (stepErrors[field]) {
      setStepErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.firstName?.trim()) errors.firstName = 'First name is required';
      if (!formData.lastName?.trim()) errors.lastName = 'Last name is required';
      if (!formData.email?.trim()) errors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email';
      }
      // Phone number is optional, so no validation needed
    }

    if (currentStep === 2) {
      if (!formData.username?.trim()) errors.username = 'Username is required';
      if (!formData.password?.trim()) errors.password = 'Password is required';
      else if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
      if (!formData.confirmPassword?.trim()) errors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    if (currentStep === 3) {
      // Step 3 doesn't have required fields, so no validation needed
      return true;
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('Form submitted, current step:', step);
    console.log('Form data:', formData);
    
    // Only validate and submit on step 3
    if (step === 3) {
      console.log('Processing step 3 registration');
      try {
        const fullName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();
        
        await register({
          name: fullName || formData.username || 'User',
          email: formData.email || '',
          password: formData.password || '',
          confirmPassword: formData.confirmPassword,
          role: formData.jobTitle,
          company: formData.company,
          experience: formData.experience,
          interests: formData.interests ? [formData.interests] : undefined,
        });

        console.log('Calling register');
        console.log('Registration completed successfully');
        // Navigation will be handled by useEffect when isAuthenticated changes
      } catch (error) {
        console.error('Registration error in component:', error);
        // Error is handled by the auth context
      }
    } else {
      console.log('Not on step 3, current step:', step);
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-2xl font-poppins font-black text-primary-foreground">S</span>
            </div>
            <span className="text-3xl font-poppins font-black text-glow">SkillSphere</span>
          </div>
          <p className="text-muted-foreground">Create your account</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNumber
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNumber ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Registration Form */}
        <Card className="glass-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-poppins font-bold">
              {step === 1 && 'Personal Information'}
              {step === 2 && 'Account Details'}
              {step === 3 && 'Professional Info'}
            </CardTitle>
            <p className="text-muted-foreground">
              {step === 1 && 'Tell us about yourself'}
              {step === 2 && 'Create your account credentials'}
              {step === 3 && 'Help us personalize your experience'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                >
                  <p className="text-sm text-destructive">{error}</p>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="John"
                          className={`pl-10 ${stepErrors.firstName ? 'border-destructive' : ''}`}
                          required
                          disabled={isLoading}
                          value={formData.firstName || ''}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      </div>
                      {stepErrors.firstName && (
                        <p className="text-xs text-destructive">{stepErrors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Doe"
                          className={`pl-10 ${stepErrors.lastName ? 'border-destructive' : ''}`}
                          required
                          disabled={isLoading}
                          value={formData.lastName || ''}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                      {stepErrors.lastName && (
                        <p className="text-xs text-destructive">{stepErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        className={`pl-10 ${stepErrors.email ? 'border-destructive' : ''}`}
                        required
                        disabled={isLoading}
                        value={formData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    {stepErrors.email && (
                      <p className="text-xs text-destructive">{stepErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      disabled={isLoading}
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone' as keyof RegisterFormData, e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="johndoe"
                      className={stepErrors.username ? 'border-destructive' : ''}
                      required
                      disabled={isLoading}
                      value={formData.username || ''}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                    />
                    {stepErrors.username && (
                      <p className="text-xs text-destructive">{stepErrors.username}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className={`pl-10 pr-10 ${stepErrors.password ? 'border-destructive' : ''}`}
                        required
                        disabled={isLoading}
                        value={formData.password || ''}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground disabled:opacity-50"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {stepErrors.password && (
                      <p className="text-xs text-destructive">{stepErrors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className={`pl-10 pr-10 ${stepErrors.confirmPassword ? 'border-destructive' : ''}`}
                        required
                        disabled={isLoading}
                        value={formData.confirmPassword || ''}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground disabled:opacity-50"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {stepErrors.confirmPassword && (
                      <p className="text-xs text-destructive">{stepErrors.confirmPassword}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                      placeholder="e.g., Senior Developer"
                      disabled={isLoading}
                      value={formData.jobTitle || ''}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="e.g., TechCorp"
                        className="pl-10"
                        disabled={isLoading}
                        value={formData.company || ''}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select 
                      value={formData.experience || ''} 
                      onValueChange={(value) => handleInputChange('experience', value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="2-3">2-3 years</SelectItem>
                        <SelectItem value="4-5">4-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Primary Interests</Label>
                    <Select 
                      value={formData.interests || ''} 
                      onValueChange={(value) => handleInputChange('interests', value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your interests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend Development</SelectItem>
                        <SelectItem value="backend">Backend Development</SelectItem>
                        <SelectItem value="fullstack">Full Stack Development</SelectItem>
                        <SelectItem value="data">Data Science & AI</SelectItem>
                        <SelectItem value="devops">DevOps & Cloud</SelectItem>
                        <SelectItem value="mobile">Mobile Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required disabled={isLoading} />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <div className="flex space-x-2">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 glass-card"
                    disabled={isLoading}
                  >
                    Previous
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 btn-primary"
                    disabled={isLoading}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1 btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                )}
              </div>
            </form>

            {step === 1 && (
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-glass-border/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button variant="outline" className="glass-card" disabled={isLoading}>
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" className="glass-card" disabled={isLoading}>
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register; 