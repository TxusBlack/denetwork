import { getSession, signOut } from "next-auth/react";

// gets a prop from getServerSideProps
const User = ({ user }) => {
  return (
    <div>
      <h4>User session:</h4>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => signOut({ redirect: "/auth" })}>Sign out</button>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default User;
