import VerifyUser from '@/components/Cabinet/Authentication/VerifyUser/VerifyUser';

const VerifyUserPage = async ({ searchParams }) => {
  const { token } = await searchParams;
  return <VerifyUser token={token} />;
};

export default VerifyUserPage;
