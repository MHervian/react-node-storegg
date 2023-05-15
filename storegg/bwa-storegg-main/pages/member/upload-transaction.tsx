import SideBar from '../../components/organisms/SideBar';
import UploadBuktiContent from '../../components/organisms/UploadTransaction';

export default function UploadContent() {
  return (
    <section className="transactions overflow-auto">
      <SideBar activeMenu="upload-transaction" />
      <UploadBuktiContent />
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    }
  }
}
  
export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
