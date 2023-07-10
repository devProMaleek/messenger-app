import { withAuth } from 'next-auth/middleware';

export default withAuth({
  // Options
  pages: {
    signIn: '/',
  },
});

export const config = {
  matcher: ['/users/:path*'],
};
