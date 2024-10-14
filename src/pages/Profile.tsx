import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import AspectRatio from "@mui/joy/AspectRatio";
import Checkbox from "@mui/joy/Checkbox";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getUser, updateUser } from "../store/actions/user";
import Loading from "../helpers/Loading";
import { userType } from "../types/user";

interface FormData extends Omit<NonNullable<userType>, "knownLanguages"> {
	knownLanguages: string;
}

interface Errors {
	name?: string;
	email?: string;
	phone?: string;
	knownLanguages?: string;
}

export default function Profile() {
	const user = useAppSelector((state) => state.user.user);
	const dispatch = useAppDispatch();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [formData, setFormData] = useState<FormData | null>(null);
	const [errors, setErrors] = useState<Errors>({});

	useEffect(() => {
		if (!user) {
			dispatch(getUser());
		}
	}, [dispatch, user]);

	if (!user) {
		return <Loading text="Совсем скоро загрузятся данные профиля!!!" />;
	}

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = event.target;
		setFormData((prev) => ({
			...prev!,
			[name]:
				type === "checkbox"
					? (event.target as HTMLInputElement).checked
					: value,
		}));
	};

	const handleAddressChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		field: keyof NonNullable<userType>["address"]
	) => {
		const { value } = event.target;
		setFormData((prev) => ({
			...prev!,
			address: {
				...prev!.address,
				[field]: value,
			},
		}));
	};

	const validateForm = (): boolean => {
		const validationErrors: Errors = {};
		if (!formData?.name) validationErrors.name = "Имя обязательно";
		if (!formData?.email)
			validationErrors.email = "Электронная почта обязательна";
		if (formData?.email && !/\S+@\S+\.\S+/.test(formData.email))
			validationErrors.email = "Некорректный формат электронной почты";
		if (!formData?.phone) validationErrors.phone = "Телефон обязателен";
		if (!formData?.knownLanguages)
			validationErrors.knownLanguages = "Языки обязательны";

		setErrors(validationErrors);
		return Object.keys(validationErrors).length === 0;
	};

	const handleSubmit = (
		event:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		if (validateForm() && formData) {
			dispatch(
				updateUser({
					...formData,
					knownLanguages: formData.knownLanguages
						.split(",")
						.map((lang) => lang.trim()),
				})
			);
			setIsEditing(false);
		}
	};

	const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsEditing(true);
		setFormData({
			...user,
			knownLanguages: user.knownLanguages.join(", "),
		});
	};

	const handleTextareaChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev!,
			[name]: value,
		}));
	};

	return (
		<Layout>
			<Box sx={{ maxWidth: "800px", mx: "auto", px: 2, py: 4 }}>
				<Card component="form" onSubmit={handleSubmit}>
					<Box sx={{ mb: 1 }}>
						<Typography>Ваш профиль</Typography>
					</Box>
					<Divider />
					<Stack spacing={2} sx={{ my: 2 }}>
						<Stack
							direction="row"
							spacing={3}
							sx={{ alignItems: "center" }}
						>
							<AspectRatio
								ratio="1"
								maxHeight={120}
								sx={{ minWidth: 120, borderRadius: "100%" }}
							>
								<img
									src={
										user.profilePhoto ||
										"https://via.placeholder.com/150"
									}
									alt="Profile"
								/>
							</AspectRatio>
						</Stack>

						<FormControl error={!!errors.name}>
							<FormLabel>Имя</FormLabel>
							<Input
								name="name"
								value={isEditing ? formData?.name : user.name}
								onChange={handleChange}
								placeholder="Имя"
								disabled={!isEditing}
							/>
							{errors.name && (
								<Typography color="error">
									{errors.name}
								</Typography>
							)}
						</FormControl>

						<FormControl>
							<FormLabel>Фамилия</FormLabel>
							<Input
								name="surname"
								value={
									isEditing ? formData?.surname : user.surname
								}
								onChange={handleChange}
								placeholder="Фамилия"
								disabled={!isEditing}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Никнейм</FormLabel>
							<Input
								name="nickname"
								value={
									isEditing
										? formData?.nickname
										: user.nickname
								}
								onChange={handleChange}
								placeholder="Никнейм"
								disabled={!isEditing}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Дата рождения</FormLabel>
							<Input
								name="birthdate"
								type="date"
								value={
									isEditing
										? formData?.birthdate
										: user.birthdate
								}
								onChange={handleChange}
								disabled={!isEditing}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Пол</FormLabel>
							<RadioGroup
								name="sex"
								value={isEditing ? formData?.sex : user.sex}
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								) => handleChange(event)}
							>
								<Radio
									value="male"
									label="Мужской"
									disabled={!isEditing}
								/>
								<Radio
									value="female"
									label="Женский"
									disabled={!isEditing}
								/>
							</RadioGroup>
						</FormControl>

						<FormControl error={!!errors.email}>
							<FormLabel>Электронная почта</FormLabel>
							<Input
								name="email"
								value={isEditing ? formData?.email : user.email}
								onChange={handleChange}
								type="email"
								placeholder="Электронная почта"
								disabled={!isEditing}
							/>
							{errors.email && (
								<Typography color="error">
									{errors.email}
								</Typography>
							)}
						</FormControl>

						<FormControl error={!!errors.phone}>
							<FormLabel>Телефон</FormLabel>
							<Input
								name="phone"
								value={isEditing ? formData?.phone : user.phone}
								onChange={handleChange}
								placeholder="Телефон"
								disabled={!isEditing}
							/>
							{errors.phone && (
								<Typography color="error">
									{errors.phone}
								</Typography>
							)}
						</FormControl>

						<FormControl>
							<FormLabel>Адрес проживания</FormLabel>
							<Input
								name="street"
								value={
									isEditing
										? formData?.address.street
										: user.address.street
								}
								onChange={(e) =>
									handleAddressChange(e, "street")
								}
								placeholder="Улица"
								sx={{ mb: 1 }}
								disabled={!isEditing}
							/>
							<Input
								name="city"
								value={
									isEditing
										? formData?.address.city
										: user.address.city
								}
								onChange={(e) => handleAddressChange(e, "city")}
								placeholder="Город"
								sx={{ mb: 1 }}
								disabled={!isEditing}
							/>
							<Input
								name="country"
								value={
									isEditing
										? formData?.address.country
										: user.address.country
								}
								onChange={(e) =>
									handleAddressChange(e, "country")
								}
								placeholder="Страна"
								disabled={!isEditing}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Компания</FormLabel>
							<Input
								name="company"
								value={
									isEditing ? formData?.company : user.company
								}
								onChange={handleChange}
								placeholder="Компания"
								disabled={!isEditing}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Профессия</FormLabel>
							<Input
								name="profession"
								value={
									isEditing
										? formData?.profession
										: user.profession
								}
								onChange={handleChange}
								placeholder="Профессия"
								disabled={!isEditing}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Опыт работы</FormLabel>
							<Input
								name="expierence"
								type="number"
								value={
									isEditing
										? formData?.expierence
										: user.expierence
								}
								onChange={handleChange}
								placeholder="Опыт работы"
								disabled={!isEditing}
							/>
						</FormControl>

						<FormControl error={!!errors.knownLanguages}>
							<FormLabel>Известные языки</FormLabel>
							<Input
								name="knownLanguages"
								value={
									isEditing
										? formData?.knownLanguages
										: user.knownLanguages.join(", ")
								}
								onChange={handleChange}
								placeholder="Известные языки (через запятую)"
								disabled={!isEditing}
							/>
							{errors.knownLanguages && (
								<Typography color="error">
									{errors.knownLanguages}
								</Typography>
							)}
						</FormControl>

						<FormControl>
							<FormLabel>Описание профиля</FormLabel>
							<Textarea
								name="profileDiscription"
								value={
									isEditing
										? formData?.profileDiscription
										: user.profileDiscription
								}
								onChange={handleTextareaChange}
								placeholder="Описание профиля"
								disabled={!isEditing}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>
								Получать уведомления по электронной почте
							</FormLabel>
							<Checkbox
								name="isGettingEmailNotifications"
								checked={
									isEditing
										? formData?.isGettingEmailNotifications
										: user.isGettingEmailNotifications
								}
								onChange={handleChange}
								disabled={!isEditing}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Получать SMS-уведомления</FormLabel>
							<Checkbox
								name="isGettingSmsNotifications"
								checked={
									isEditing
										? formData?.isGettingSmsNotifications
										: user.isGettingSmsNotifications
								}
								onChange={handleChange}
								disabled={!isEditing}
							/>
						</FormControl>

						<Button
							variant="outlined"
							onClick={isEditing ? handleSubmit : handleEdit}
						>
							{isEditing
								? "Сохранить изменения"
								: "Редактировать"}
						</Button>
					</Stack>
				</Card>
			</Box>
		</Layout>
	);
}
