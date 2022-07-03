import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useFormikContext } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../../config/colors";
import ErrorMessage from "./ErrorMessage";

const PickerDate = ({ name, width, ...otherProps }) => {
  const [show, setShow] = useState(false);

  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setFieldValue(name, currentDate);
    setShow(false);
  };

  const showDatepicker = () => {
    setFieldValue(name, new Date());
    setFieldTouched(name, true);
    setShow(true);
  };
  return (
    <>
      <View>
        <TouchableOpacity style={styles.button} onPress={showDatepicker}>
          <Text style={styles.text}>Birth Date</Text>
        </TouchableOpacity>
        {/* show date without time */}
        <Text style={styles.date_text}>
          {values[name] ? values[name].toDateString() : ""}
        </Text>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={values[name]}
            mode="date"
            onChange={onChange}
          />
        )}
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default PickerDate;

const styles = StyleSheet.create({
  button: {
    margin: 10,
    backgroundColor: colors.secondary,
    borderRadius: 30,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    color: colors.medium,
  },

  date_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
  },
});
