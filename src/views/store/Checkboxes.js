import React from "react";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

export default function CheckboxLabels({option, setOption, read}) {
  const handleChange = (event) => {
    if(read) return;
    setOption({...option, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onChange={handleChange}
            checked={option.checkedA}
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
            checked={option.checkedB}
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
            checked={option.checkedC}
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
            checked={option.checkedD}
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
            checked={option.checkedE}
            name="checkedE"
          />
        }
        label="흡연 가능"
      />
    </FormGroup>
  );
}
