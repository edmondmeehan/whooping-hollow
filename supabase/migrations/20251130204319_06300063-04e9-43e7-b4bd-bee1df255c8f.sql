-- Add admin role for eddie@please.co
INSERT INTO public.user_roles (user_id, role)
VALUES ('15c1eb26-6020-4c42-a5b7-40fb09817020', 'admin'::app_role)
ON CONFLICT (user_id, role) DO NOTHING;