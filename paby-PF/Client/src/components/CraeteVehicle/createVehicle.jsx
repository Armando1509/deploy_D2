import React from 'react';
//import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './createVehicle.module.css';
import { useAuth0 } from '@auth0/auth0-react'
import { Form as BSForm, FormGroup, FormLabel, FormControl, FormSelect, Button } from 'react-bootstrap';

export default function CreateVehicle() {
  const { user, isLoading } = useAuth0();
  if (isLoading) {
    return (<div>Cargando...</div>);
  };
  console.log(user.sub)
  const initialValues = { 
    sub:'',
    vehicle_tipe:'',
    type_of_service: '',
    car_brand: '',
    car_model: '',
    car_model_year: '',
    car_color:'',
    license_plate: '',
    license_plate_id:'',
    photo: '',
  };

  //Esquema de validacion
  const validationSchema = Yup.object({
    vehicle_tipe: Yup.string().required('Debe seleccionar un tipo de vehiculo'),
    type_of_service: Yup.string().required('Debe seleccionar el tipo de servicio'),
    car_brand: Yup.string().required('La marca es obligatoria'),
    car_model: Yup.string().required('El modelo es obligatorio'),
    car_model_year: Yup.string()
    .required('El año del vehículo es obligatorio')
    .matches(/^\d+$/, 'El año debe ser un número'),
    car_color: Yup.string().required('El color del vehiculo es obligatorio'),
    //license_plate: Yup.string().required('La matricula es obligatoria'),
    license_plate: Yup.string()
    .min(1, "La placa debe tener al menos 1 caracter")
    .max(7, "La placa no puede tener más de 7 caracteres")
    .required("La placa es un campo obligatorio"),
    //photo: Yup.mixed().required('Foto obligatoria'),*/
  });

    // Aquí iría la lógica de enviar los datos al servidor
    const handleSubmit = async (values, { resetForm }) => {

      //const licensePlate = values.license_plate;
      const placa = values.license_plate;
      const requestData = {

        sub: user.sub,
        license_plate_id: placa,
        license_plate: placa,
        vehicle_tipe: values.vehicle_tipe,
        type_of_service: values.type_of_service,
        car_brand: values.car_brand,
        car_model: values.car_model,
        car_model_year: values.car_model_year,
        car_color: values.car_color,
        photo: values.photo,
      };
      

      try {
        //console.log(requestData);
        const response = await axios.post('http://localhost:3001/users/create/vehicle',requestData, {
        
          headers: {
            'Content-Type': 'application/json'
          }
        });
      alert("¡El vehículo ha sido creado!");

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div className="container">
    <Link to="/vehicles">
      <button className="back-button">Atras</button>
    </Link>
    <h1>Crear Vehiculo</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      >
      {({ setFieldValue, isSubmitting }) => (
        <Form className={styles.formCreateVehicle}>
          <div>
            <label htmlFor="vehicle_tipe">Tipo de vehículo</label>
            <Field as="select" id="vehicle_tipe" name="vehicle_tipe">

              {/* <select onChange={handlerInputChange} name='types' defaultValue={'default'}>
                    <option value='default'>1 or 2 types</option> */}
                    
              <option value="default">Seleccionar</option>
              <option value="Automovil">Automovil</option>
              <option value="Motocicleta">Motocicleta</option>
            </Field>
            <ErrorMessage name="vehicle_tipe" className="error-message"/>
          </div>

          <div>
            <label htmlFor="type_of_service">Tipo de servicio</label>
            <Field as="select" id="type_of_service" name="type_of_service">
              <option value="default">Seleccionar</option>
              <option value="Particular">Particular</option>
              <option value="Publico">Público</option>
            </Field>
            <ErrorMessage name="type_of_service" className="error-message"/>
          </div>

          <div>
            <label htmlFor="car_brand">Marca</label>
            <Field type="text" id="car_brand" name="car_brand" />
            <ErrorMessage name="car_brand" className="error-message"/>
          </div>

          <div>
            <label htmlFor="car_model">Modelo</label>
            <Field type="text" id="car_model" name="car_model" />
            <ErrorMessage name="car_model" className="error-message"/>
          </div>

          <div>
            <label htmlFor="car_model_year">Año</label>
            <Field type="text" id="car_model_year" name="car_model_year" />
            <ErrorMessage name="car_model_year" className="error-message"/>
          </div>

          <div>
            <label htmlFor="car_color">Color</label>
            <Field type="text" id="car_color" name="car_color" />
            <ErrorMessage name="car_color" className="error-message"/>
          </div>

          <div>
            <label htmlFor="license_plate">Matrícula</label>
            <Field type="text" id="license_plate" name="license_plate" />
            <ErrorMessage name="license_plate" className="error-message"/>
          </div>

          <div>
            <label htmlFor="photo">Foto</label>
            <Field
              type="file"
              id="photo"
              name="photo"
              onChange={(event) => {
                setFieldValue("photo", event.currentTarget.files[0]);
              }}
            />
          </div>

          <div>
            <button type="submit" disabled={isSubmitting}>
              Crear
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);
}