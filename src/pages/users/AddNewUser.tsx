"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AddUserSchema, User } from "@/schemas/user";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { useUsers } from "@/services/use-users";

function AddNewUser() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const { addUser, users } = useUsers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<User, "id">>({
    resolver: zodResolver(AddUserSchema),
  });

  const onSubmit: SubmitHandler<Omit<User, "id">> = async (data) => {
    await addUser(data);
    setIsAddUserModalOpen(false);
    reset();
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="ml-4 py-2 px-4 text-black  bg-white rounded-xl"
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
              {...register("name")}
            />
            <Input
              error={errors.email?.message}
              label="Email"
              {...register("email")}
              className="border p-2 rounded w-full"
            />
            <div className="lg:grid grid-cols-2 gap-x-4 gap-y-2">
              <Input
                label="Username"
                error={errors.username?.message}
                {...register("username")}
                className="border p-2 rounded w-full"
              />
              <Input
                {...register("phone")}
                label="Phone number"
                error={errors.phone?.message}
                placeholder="Enter phone"
              />
            </div>
            <Input
              {...register("website")}
              label="Website"
              error={errors.website?.message}
              placeholder="Enter website"
            />
            <div className="lg:grid grid-cols-2 gap-x-4 gap-y-2">
              <h2 className="col-span-2 font-semibold text-lg mt-2">Address</h2>
              <Input
                error={errors.address?.street?.message}
                label="Street"
                {...register("address.street")}
                placeholder="Enter street"
                className="border p-2 rounded w-full"
              />
              <Input
                {...register("address.suite")}
                label="Suite"
                error={errors.address?.suite?.message}
                placeholder="Enter suite"
              />
              <Input
                label="City"
                {...register("address.city")}
                error={errors.address?.city?.message}
                className="border p-2 rounded w-full"
              />
              <Input
                {...register("address.zipcode")}
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
                error={errors.company?.name?.message}
                {...register("company.name")}
                className="border p-2 rounded w-full"
              />
              <Input
                type="text"
                {...register("company.catchPhrase")}
                label="Catch Phrase"
                error={errors.company?.catchPhrase?.message}
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                className="outline-none border px-3 py-2 w-full rounded-xl"
                {...register("company.bs")}
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
