import * as Yup from 'yup';
import parse from "date-fns/parse";

export const locationUpdateFormValidation = Yup.object({
    city: Yup
                .string()
                .min(2, "City has to be at least 2 characters!")
                .max(30, "City cannot be longer than 30 characters!")
                .required("City is required!"),
    country: Yup
                .string()
                .min(2, "Country has to be at least 2 character!")
                .max(50, "Country cannot be longer than 50 characters!")
                .required("Country is required!"),
    file: Yup
                .mixed()
                .nullable(true)
                .test("fileFormat", "Not a valid image type", value => {
                    if (value) {
                        const supportedFormats = ['jpg', 'jpeg', 'png'];
                        return supportedFormats.includes(value.name.split('.').pop());
                      }
                      return true;
                })
                .test('fileSize', 'File size must be less than 3MB', value => {
                    if (value) {
                      return value.size <= 3145728;
                    }
                    return true;
                })
});

export const locationRegistrationFormValidation = Yup.object({
    city: Yup
                .string()
                .min(2, "City has to be at least 2 characters!")
                .max(30, "City cannot be longer than 30 characters!")
                .required("City is required!"),
    country: Yup
                .string()
                .min(2, "Country has to be at least 2 character!")
                .max(50, "Country cannot be longer than 50 characters!")
                .required("Country is required!"),
    file: Yup
                .mixed()
                .required("Picture is required!")
                .test("fileFormat", "Not a valid image type", value => {
                    if (value) {
                        const supportedFormats = ['jpg', 'jpeg', 'png'];
                        return supportedFormats.includes(value.name.split('.').pop());
                      }
                      return true;
                })
                .test('fileSize', 'File size must be less than 3MB', value => {
                    if (value) {
                      return value.size <= 3145728;
                    }
                    return true;
                })
});

export const activityRegistrationFormValidation = Yup.object({
    name: Yup
                .string()
                .min(2, "Name has to be at least 2 characters!")
                .max(50, "Name cannot be longer than 50 characters!")
                .required("Name is required!"),
    description: Yup
                .string()
                .min(10, "Description has to be at least 10 characters!")
                .max(500, "Description cannot be longer than 500 characters!")
                .required("Description is required!"),
    duration: Yup
                .number()
                .test('integer', "Number must be integer!", (value) => Number.isInteger(value))
                .min(1, "Duration cannot be less than 1 day!")
                .required("Duration is required!"),
    cost: Yup
            .number()
            .test('integer', "Number must be integer!", (value) => Number.isInteger(value))
            .min(0, "Cost cannot be less than 1!")
            .required("Cost is required!"),
    locationId: Yup
            .number()
            .required("Location is required!")
});

export const activityUpdateFormValidation = Yup.object({
    name: Yup
                .string()
                .min(2, "Name has to be at least 2 characters!")
                .max(50, "Name cannot be longer than 50 characters!")
                .required("Name is required!"),
    description: Yup
                .string()
                .min(10, "Description has to be at least 10 characters!")
                .max(500, "Description cannot be longer than 500 characters!")
                .required("Description is required!"),
    duration: Yup
                .number()
                .test('integer', "Number must be integer!", (value) => Number.isInteger(value))
                .min(1, "Duration cannot be less than 1 day!")
                .required("Duration is required!"),
    cost: Yup
            .number()
            .min(0, "Cost cannot be less than 1!")
            .test('integer', "Number must be integer!", (value) => Number.isInteger(value))
            .required("Cost is required!"),
    locationId: Yup
            .number()
            .required("Location is required!")
});

export const eventRegistrationFormValidation = Yup.object({
    name: Yup
                .string()
                .min(2, "Name has to be at least 2 characters!")
                .max(50, "Name cannot be longer than 50 characters!")
                .required("Name is required!"),
    description: Yup
                .string()
                .min(10, "Description has to be at least 10 characters!")
                .max(500, "Description cannot be longer than 500 characters!")
                .required("Description is required!"),
    file: Yup
                .mixed()
                .required("Picture is required!")
                .test("fileFormat", "Not a valid image type", value => {
                    if (value) {
                        const supportedFormats = ['jpg', 'jpeg', 'png'];
                        return supportedFormats.includes(value.name.split('.').pop());
                      }
                      return true;
                })
                .test('fileSize', 'File size must be less than 3MB', value => {
                    if (value) {
                      return value.size <= 3145728;
                    }
                    return true;
                }),
    date: Yup
                .date()
                .transform((value, originalValue) => {
                    const result = parse(originalValue, "yyyy-MM-dd", new Date());
                    return result;
                })
                .typeError("Please enter a valid date")
                .required()
                .min("2024-01-01", "Date is too early"),
    cost: Yup
                .number()
                .test('integer', "Number must be integer!", (value) => Number.isInteger(value))
                .min(0, "Cost cannot be less than 1!")
                .required("Cost is required!"),
    duration: Yup
                .number()
                .test('integer', "Number must be integer!", (value) => Number.isInteger(value))
                .min(1, "Duration cannot be less than 1 day!")
                .required("Duration is required!"), 
    locationId: Yup
                .number()
                .required("Location is required!")
});

export const eventUpdateFormValidation = Yup.object({
    name: Yup
                .string()
                .min(2, "Name has to be at least 2 characters!")
                .max(50, "Name cannot be longer than 50 characters!")
                .required("Name is required!"),
    description: Yup
                .string()
                .min(10, "Description has to be at least 10 characters!")
                .max(500, "Description cannot be longer than 500 characters!")
                .required("Description is required!"),
    file: Yup
                .mixed()
                .nullable(true)
                .test("fileFormat", "Not a valid image type", value => {
                    if (value) {
                        const supportedFormats = ['jpg', 'jpeg', 'png'];
                        return supportedFormats.includes(value.name.split('.').pop());
                      }
                      return true;
                })
                .test('fileSize', 'File size must be less than 3MB', value => {
                    if (value) {
                      return value.size <= 3145728;
                    }
                    return true;
                }),
    date: Yup
                .date()
                .transform((value, originalValue) => {
                    const result = parse(originalValue, "yyyy-MM-dd", new Date());
                    return result;
                })
                .typeError("Please enter a valid date")
                .required()
                .min("2024-01-01", "Date is too early"),
    cost: Yup
                .number()
                .test('integer', "Number must be integer!", (value) => Number.isInteger(value))
                .min(0, "Cost cannot be less than 1!")
                .required("Cost is required!"),
    duration: Yup
                .number()
                .test('integer', "Number must be integer!", (value) => Number.isInteger(value))
                .min(1, "Duration cannot be less than 1 day!")
                .required("Duration is required!"),
    
    locationId: Yup
            .number()
            .required("Location is required!")
});

export const newsUpdateFormValidation = Yup.object({
    title: Yup
                .string()
                .min(2, "Title must be at least 2 characters!")
                .max(100, "Title must be shorter that 100 characters!")
                .required("Title is required!"),
    description: Yup
                .string()
                .min(10, "Description must be at least 10 characters!")
                .required("Description is required!"),
    file: Yup
                .mixed()
                .nullable(true)
                .test("fileFormat", "Not a valid image type", value => {
                    if (value) {
                        const supportedFormats = ['jpg', 'jpeg', 'png'];
                        return supportedFormats.includes(value.name.split('.').pop());
                      }
                      return true;
                })
                .test('fileSize', 'File size must be less than 3MB', value => {
                    if (value) {
                      return value.size <= 3145728;
                    }
                    return true;
                })
})

export const newsRegistrationFormValidation = Yup.object({
    title: Yup
                .string()
                .min(2, "Title must be at least 2 characters!")
                .max(100, "Title must be shorter that 100 characters!")
                .required("Title is required!"),
    description: Yup
                .string()
                .min(10, "Description must be at least 10 characters!")
                .required("Description is required!"),
    image: Yup
                .mixed()
                .nullable(true)
                .test("fileFormat", "Not a valid image type", value => {
                    if (value) {
                        const supportedFormats = ['jpg', 'jpeg', 'png'];
                        return supportedFormats.includes(value.name.split('.').pop());
                      }
                      return true;
                })
                .test('fileSize', 'File size must be less than 3MB', value => {
                    if (value) {
                      return value.size <= 3145728;
                    }
                    return true;
                })
})

export const adminRegistrationFormValidation = Yup.object({
	fullname: Yup
				.string()
				.min(5, "Fullname has to be at least 5 characters!")
				.max(30, "Fullname cannot be longer than 30 characters!")
				.required("Fullname is required!"),
	username: Yup
				.string()
				.min(5, "Username has to be at least 5 character!")
				.max(30, "Username cannot be longer than 30 characters!")
				.required("Username is required!"),
	email: Yup
				.string()
				.email()
				.required("Email is required!"),
	password: Yup
				.string()
				.min(5, "Password must be at least 5 characters")
				.max(20, "Username cannot be longer than 20 characters!")
				.required("Password is required")
});

export const flightRegistrationFormValidation = Yup.object({
  departure: Yup
        .date()
        .typeError("Please enter a valid date")
        .required("Date is required"),
  originId: Yup
        .number()
        .required("Origin is required!"),
  destinationId: Yup
        .number()
        .required("Destination is required!")
        .notOneOf([Yup.ref('originId'), null], "Origin and destination must be different!")
});

export const flightUpdateFormValidation = Yup.object({
  departure: Yup
        .date()
        .typeError("Please enter a valid date")
        .required("Date is required"),
  originId: Yup
        .number()
        .required("Origin is required!"),
  destinationId: Yup
        .number()
        .required("Destination is required!")
        .notOneOf([Yup.ref('originId'), null], "Origin and destination must be different!")
});

export const itemRegistrationFormValidation = Yup.object({
  name: Yup
      .string()
      .min(2, "Item must be longer than 2 characters!")
      .max(30, "Item cannot be longer than 30 characters!")
      .required("Item is required!")
})

export const hotelRegistrationFormValidation = Yup.object({
  name: Yup
      .string()
      .min(2, "Hotel name must be longer than 2 characters!")
      .max(30, "Hotel name cannot be longer than 30 characters!")
      .required("Hotel name is required"),
  locationId: Yup
      .number()
      .required("Location is required!"),
  rating: Yup
      .number()
      .min(0, "Rating cannot be less than 0!")
      .max(5, "Rating cannot be larger than 5")
      .required("Rating is required!"),
  bookingLink: Yup
      .string()
      .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter a valid link!')
      .required("Booking link is required!")
});

export const hotelUpdateFormValidation = Yup.object({
  name: Yup
      .string()
      .min(2, "Hotel name must be longer than 2 characters!")
      .max(30, "Hotel name cannot be longer than 30 characters!")
      .required("Hotel name is required"),
  locationId: Yup
      .number()
      .required("Location is required!"),
  rating: Yup
      .number()
      .min(0, "Rating cannot be less than 0!")
      .max(5, "Rating cannot be larger than 5")
      .required("Rating is required!"),
  bookingLink: Yup
      .string()
      .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter a valid link!')
      .required("Booking link is required!")
});