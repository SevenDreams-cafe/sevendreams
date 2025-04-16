// interface UserProps {
//   userEmail: string;
// }

export function JumbotronComponent() {
  return (
    <div>
      <div className="flex flex-wrap gap-x-2 text-2xl">
        <h4>Selamat Datang, </h4>
        <h4 className="font-bold">Anshari</h4>
      </div>
      <p className="text-base mt-1">
        Selamat Datang di SevenDreams, Aplikasi Kasir Berbasis Web
      </p>
    </div>
  );
}
