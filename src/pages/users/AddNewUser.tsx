"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { addUserSchema } from "@/schemas/user";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

function AddNewUser() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addUserSchema),
  });

  const onSubmit = async (data: any) => {
    console.log("SUCCESS", data);
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
              {...register("name")}
              error={errors.name?.message}
              label="Name"
            />
            <Input
              error={errors.email?.message}
              label="Email"
              {...register("email")}
              className="border p-2 rounded w-full"
            />
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
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
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <h2 className="col-span-2 font-semibold text-lg">Address</h2>
              <Input
                error={errors.street?.message}
                label="Street"
                {...register("street")}
                placeholder="Enter street"
                className="border p-2 rounded w-full"
              />
              <Input
                {...register("suite")}
                label="Suite"
                error={errors.suite?.message}
                placeholder="Enter suite"
              />
              <Input
                label="City"
                {...register("city")}
                error={errors.city?.message}
                className="border p-2 rounded w-full"
              />
              <Input
                {...register("zipcode")}
                error={errors.zipcode?.message}
                label="Zipcode"
                placeholder="Enter zipcode"
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <h2 className="col-span-2 font-semibold text-lg">
                Company details
              </h2>
              <Input
                label="Company name"
                error={errors["company.name"]?.message}
                {...register("company.name")}
                className="border p-2 rounded w-full"
              />
              <Input
                {...register("catchPhrase")}
                label="Catch Phrase"
                error={errors.catchPhrase?.message}
                placeholder="Enter username"
              />
              <Input
                {...register("website")}
                label="Website"
                error={errors.website?.message}
                placeholder="Enter website"
              />
              <Input
                {...register("bs")}
                label="Description"
                error={errors.bs?.message}
                placeholder="Enter username"
              />
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
