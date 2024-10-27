'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { AddUserSchema, User } from '@/schemas/user';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { useAPI } from '@/context/apiContext';
import { generateId } from '@/lib/utils';

function AddNewUser() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const { setUsers, users } = useAPI();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<User, 'id'>>({
    resolver: zodResolver(AddUserSchema),
  });

  const onSubmit: SubmitHandler<Omit<User, 'id'>> = async (data) => {
    const id = generateId(users);
    const user: User = { id, ...data };
    setUsers((prevUsers) => [...prevUsers, user]);
    setIsAddUserModalOpen(false);
    reset();
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="  py-2 px-2 md:px-4 text-black  bg-white rounded-xl "
        >
          Add New User
        </button>
      </div>
      {isAddUserModalOpen ? (
        <Modal
          title="Add New User"
          onClose={() => setIsAddUserModalOpen(false)}
        >
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <Input
              error={errors.name?.message}
              label="Name"
              {...register('name')} 
              placeholder="Enter full name"
            />
            <Input
              error={errors.email?.message}
              label="Email"
              {...register('email')}
              placeholder="Enter a valid email" 
            />
            <div className="lg:grid grid-cols-2 gap-x-4 gap-y-2">
              <Input
                label="Username"
                error={errors.username?.message}
                {...register('username')}
                placeholder="Enter username"
              />
              <Input
                {...register('phone')}
                label="Phone number"
                error={errors.phone?.message}
                placeholder="Enter phone"
              />
            </div>
            <Input
              {...register('website')}
              label="Website"
              error={errors.website?.message}
              placeholder="Enter website"
            />
            <div className="lg:grid grid-cols-2 gap-x-4 gap-y-2">
              <h2 className="col-span-2 font-semibold text-lg mt-2">Address</h2>
              <Input
                error={errors.address?.street?.message}
                label="Street"
                {...register('address.street')}
                placeholder="Enter street"
              />
              <Input
                {...register('address.suite')}
                label="Suite" required={false}
                error={errors.address?.suite?.message}
                placeholder="Enter suite"
              />
              <Input
                label="City"
                {...register('address.city')}
                error={errors.address?.city?.message}
                placeholder="Enter city name"
              />
              <Input
                {...register('address.zipcode')} required={false}
                error={errors.address?.zipcode?.message}
                label="Zipcode"
                placeholder="Enter zipcode"
              />
            </div>
            <div className="lg:grid grid-cols-2 gap-x-4 gap-y-2">
              <h2 className="col-span-2 font-semibold text-lg mt-2">
                Company details
              </h2>
              <Input
                label="Company name"
                type="text"
                placeholder="Enter company name"
                error={errors.company?.name?.message}
                {...register('company.name')}
              />
              <Input
                type="text" required={false}
                {...register('company.catchPhrase')}
                label="Catch Phrase"
                error={errors.company?.catchPhrase?.message}
                placeholder="Enter catch phrase"
              />
            </div>
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                className="outline-none border px-3 py-2 w-full rounded-xl"
                {...register('company.bs')}
                placeholder="Enter description"
              />
              <p className="text-red-500 mt-1 text-xs">
                {errors.company?.bs?.message}
              </p>
            </div>
            <div className="flex justify-end gap-4 pt-8">
              <button
                type="submit"
                className="w-full  p-2 bg-black text-white rounded-xl"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  );
}
export default AddNewUser;
