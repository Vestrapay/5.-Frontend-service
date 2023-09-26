import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import { MdCancel } from 'react-icons/md';
import { useNewUserContext } from '../../context/newUserContext';
import { Camera } from 'react-huge-icons/bulk';
import { DefaultInput } from '@/components/reusables';
import { CreateUserProps, UserDetailProps } from '@types';

const EditUser = ({ data, id }: { data: UserDetailProps, id: number }) => {
    const { setIsEditUser } = useNewUserContext();

    const [formData, setFormData] = useState({
        ...data,
    });

    useEffect(() => {
    //     TODO: Fetch the user's details from the API
    }, []);



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Submitted');
    };

    return (
        <>
            <div className="flex flex-col items-center w-full relative">
                <div className="flex justify-between w-full mb-5">
                    <span className="flex justify-start text-left font-bold">Edit User</span>
                    <MdCancel
                        onClick={() => setIsEditUser(false)}
                        width={15}
                        height={15}
                        className="text-red text-2xl opacity-40 absolute top-0 right-2 cursor-pointer hover:opacity-100 hover:scale-105 transition-all active:opacity-80 active:scale-100"
                    />
                </div>

                <div className="flex justify-center items-center p-10 bg-slate-100 rounded-full">
                    <Camera className="w-10 h-10 text-unselected m-0" />
                </div>
            </div>
            <div className="flex flex-col w-full">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label className="text-xs text-unselected">First Name</label>
                    <input
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        type="text"
                        value={formData.firstName}
                        name="firstName"
                        className="w-full h-8 border-none mb-2 rounded-md bg-slate-100 text-sm text-unselected px-3 outline-none"
                    />
                    <label className="text-xs text-unselected">Last Name</label>
                    <input
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        value={formData.lastName}
                        type="text"
                        name="lastName"
                        className="w-full h-8 border-none mb-2 rounded-md bg-slate-100 text-sm text-unselected px-3 outline-none"
                    />
                    <label className="text-xs text-unselected">Email</label>
                    <input
                        type="text"
                        name="email"
                        className="w-full h-8 border-none mb-2 rounded-md bg-slate-100 text-sm text-unselected px-3 outline-none"
                    />
                    <label className="text-xs text-unselected">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        className="w-full h-8 border-none mb-2 rounded-md bg-slate-100 text-sm text-unselected px-3 outline-none"
                    />
                    <label className="text-xs text-unselected">Gender</label>
                    <select className="w-full h-8 border-none mb-2 rounded-md bg-slate-100 text-sm text-unselected px-3 outline-none">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <label className="text-xs text-unselected">Address</label>
                    <input
                        type="text"
                        name="address"
                        className="w-full h-8 border-none mb-2 rounded-md bg-slate-100 text-sm text-unselected px-3 outline-none"
                    />
                    <label className="text-xs text-unselected">User's Role</label>
                    <select className="w-full h-8 border-none mb-2 rounded-md bg-slate-100 text-sm text-unselected px-3 outline-none">
                        <option value="Male">Front Desk Officer</option>
                    </select>
                    <button className="w-full h-8 border-none mt-2 rounded-md bg-selected text-sm text-white px-3 outline-none cursor-pointer hover:opacity-90 active:opacity-80">
                        Edit User
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditUser;
