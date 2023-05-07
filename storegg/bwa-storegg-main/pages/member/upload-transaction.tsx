import SideBar from '../../components/organisms/SideBar';
import TransactionContent from '../../components/organisms/TransactionContent';

export default function UploadTransaction() {
  return (
    <section className="transactions overflow-auto">
      <SideBar activeMenu="upload-transaction" />
      <main className="main-wrapper">
        <h2>Upload Transaction</h2>
      </main>
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
