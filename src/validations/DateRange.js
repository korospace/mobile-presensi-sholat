import * as Yup from 'yup';

// -- date range rules --
const dateRangeValidation = Yup.object().shape({
    datestart: Yup.string()
        .required(' '),
    dateend: Yup.string()
            .required(' ')
});

export default dateRangeValidation;