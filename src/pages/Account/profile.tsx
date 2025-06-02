import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../../components/ui/card";
import Input from "../../components/ui/input";
import Button from "../../components/ui/Button";
import { motion } from "framer-motion";

const Profile: React.FC = () => {
  const { t } = useTranslation(["dashboard"]);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, City, Country",
    avatar: "/img/avatar-placeholder.jpg",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!profile.name.trim()) newErrors.name = t("nameRequired");
    if (!profile.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = t("invalidEmail");
    if (!profile.address.trim()) newErrors.address = t("addressRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      setProfile({ ...profile, avatar: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // TODO: Save profile to backend
      console.log("Profile updated:", profile, avatarFile);
    }
  };

  return (
    <motion.div
      className="p-4 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        {t("profile")}
      </h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <motion.img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
                onError={(e) => {
                  e.currentTarget.src = "/img/avatar-placeholder.jpg";
                }}
                whileHover={{ scale: 1.05 }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
              <label htmlFor="avatar-upload">
                <Button variant="secondary">{t("uploadPhoto")}</Button>
              </label>
            </div>

            {/* Form Fields */}
            <div className="flex-1 space-y-4">
              <Input
                label="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your name..."
                error={errors.name}
              />
              <Input
                label="email"
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter your email..."
                error={errors.email}
              />
              <Input
                label="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Enter your address..."
                error={errors.address}
              />
              <Button type="submit">{t("saveChanges")}</Button>
            </div>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default Profile;