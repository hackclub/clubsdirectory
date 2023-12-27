import React from "react";
import { Card, Grid, Label, Checkbox } from "theme-ui";

export const TableLabel = ({
  clubs,
  filterResults,
  setSelectedClubs,
  selectedClubs,
}) => {
  const clubsInView = clubs
    .filter((clubFilter) => filterResults(clubFilter))
    .map((club) => club.id);

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  return (
    <Card as={"div"} variant="sunken" sx={{ p: [1, 2] }} mb={2}>
      <Grid
        columns={[null, "0.15fr 1.5fr 1.5fr 1.5fr 1.5fr 1fr"]}
        gap={3}
        sx={{ pl: [1, 3], pr: [1, 3], alignItems: "center" }}
      >
        <Label>
          <Checkbox
            onClick={() => {
              if (arraysEqual(selectedClubs, clubsInView)) {
                setSelectedClubs([]);
              } else {
                setSelectedClubs(clubsInView);
              }
            }}
            checked={
              selectedClubs.length != 0 &&
              arraysEqual(selectedClubs, clubsInView)
            }
            defaultChecked={false}
          />
        </Label>
        <p>Club Name</p>
        <p>School</p>
        <p>Location</p>
        <p>Leader(s)</p>
      </Grid>
    </Card>
  );
};
