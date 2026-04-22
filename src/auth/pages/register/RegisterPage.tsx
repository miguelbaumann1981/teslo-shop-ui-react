import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CustomLogo } from '@/components/custom/CustomLogo';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '@/auth/store/auth.store';
import { useState, type SubmitEvent } from 'react';
import { toast } from 'sonner';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [isPosting, setIsPosting] = useState(false);
  const { register } = useAuthStore();

  const handleRegister = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsPosting(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const isRegisterValid = await register(fullName, email, password);
    if (isRegisterValid) {
      setTimeout(() => {
        navigate('/auth/login');
        toast.success('Se ha registrado correctamente');
      }, 1500);
      return;
    }

    toast.error('Correo y/o contraseña inválidos');
    setIsPosting(false);
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' onSubmit={handleRegister}>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <CustomLogo />
                <p className='text-balance text-muted-foreground'>
                  Registrate en nuestra app
                </p>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='fullName'>Nombre</Label>
                <Input
                  id='fullName'
                  type='text'
                  name='fullName'
                  placeholder='Nombre...'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  name='email'
                  placeholder='mail@mail.com'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Contraseña</Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  name='password'
                  placeholder='Contraseña...'
                  required
                />
              </div>
              <Button type='submit' className='w-full' disabled={isPosting}>
                Registrar
              </Button>

              <div className='text-center text-sm'>
                <Link to='/auth/login' className='underline underline-offset-4'>
                  Volver a inicio
                </Link>
              </div>
            </div>
          </form>
          <div className='relative hidden bg-muted md:block'>
            <img
              src='/placeholder.svg'
              alt='Image'
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
          </div>
        </CardContent>
      </Card>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
        Para continuar acepta nuestros <a href='#'>Términos y condiciones</a> y{' '}
        <a href='#'>Política de privacidad</a>.
      </div>
    </div>
  );
};
