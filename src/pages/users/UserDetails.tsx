import UserItem from "@/components/ui/UserItem";
import { User } from "@/schemas/user";

function UserDetailsModal({ user }: { user: User | null | undefined }) {
  if (!user) return null;
  const { name, email, username, address, website, company } = user;

  return (
    <section>
      <UserItem tag="Name" value={name} />
      <UserItem tag="Email" value={email} />
      <UserItem tag="Username" value={username} />
      <UserItem tag="Website" value={website} />
      <h2 className="font-semibold text-lg mt-4">Company details</h2>
      <UserItem tag="Company name" value={company.name} />
      <UserItem tag="Catch phrase" value={company.catchPhrase} />
      <UserItem tag="Description" value={company.bs} />
      <p className="font-semibold text-lg mt-4">Address</p>
      <div className="lg:grid grid-cols-2 gap-x-4 gap-y-2">
        <UserItem tag="Street" value={address.street} />
        <UserItem tag="City" value={address.city} />
        <UserItem tag="Zipcode" value={address.zipcode} />
        <UserItem tag="Suite" value={address.suite} />
      </div>
    </section>
  );
}
export default UserDetailsModal;
