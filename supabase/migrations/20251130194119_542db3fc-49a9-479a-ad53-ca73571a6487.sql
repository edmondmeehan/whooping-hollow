-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policy: Users can view their own roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id);

-- Policy: Admins can view all roles
CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Enable RLS on home_systems
ALTER TABLE public.home_systems ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin only access to home systems" ON public.home_systems
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Enable RLS on house_services_directory
ALTER TABLE public.house_services_directory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin only access to house services" ON public.house_services_directory
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Enable RLS on external_service_links
ALTER TABLE public.external_service_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin only access to external links" ON public.external_service_links
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Fix booking_requests policies
DROP POLICY IF EXISTS "Anyone can view booking requests" ON public.booking_requests;
DROP POLICY IF EXISTS "Anyone can update booking requests" ON public.booking_requests;
DROP POLICY IF EXISTS "Anyone can delete booking requests" ON public.booking_requests;

-- Keep public insert for booking submissions
CREATE POLICY "Public can insert booking requests" ON public.booking_requests
FOR INSERT WITH CHECK (true);

-- Admin-only access for viewing, updating, and deleting
CREATE POLICY "Admins can view booking requests" ON public.booking_requests
FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update booking requests" ON public.booking_requests
FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete booking requests" ON public.booking_requests
FOR DELETE USING (public.has_role(auth.uid(), 'admin'));