import React from "react";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

export default function CheckboxLabels() {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    checkedE: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(state);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onChange={handleChange}
            name="checkedA"
          />
        }
        label="디카페인"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onChange={handleChange}
            name="checkedB"
          />
        }
        label="두유 가능"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onChange={handleChange}
            name="checkedC"
          />
        }
        label="주차 가능"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onChange={handleChange}
            name="checkedD"
          />
        }
        label="Wi-Fi"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onChange={handleChange}
            name="checkedE"
          />
        }
        label="흡연 가능"
      />
    </FormGroup>
  );
}
