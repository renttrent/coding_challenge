import { Alert, Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, ReactElement } from "react";
import { Startup } from "../../Types/Startup";
import { useState, useEffect } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";

const StartupCard: React.FC<{
  startup: Startup;
}> = ({ startup }) => {
  return (
    <Grid item>
      <Card sx={{ padding: "1em", marginY: "1em" }}>
        <Typography sx={{ fontSize: "2em", fontWeight: "medium" }}>
          {startup.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            color: "#333",
          }}
        >
          <Typography>
            Founded:{" "}
            {startup.dateFounded.toLocaleDateString("en-US", {
              year: "numeric",
            })}
          </Typography>
          <Typography>|</Typography>
          <Typography>{startup.employees} Employees</Typography>
          <Typography>|</Typography>
          <Typography>{startup.totalFunding} $</Typography>
          <Typography>|</Typography>
          <Typography>{startup.currentInvestmentStage}</Typography>
        </Box>
        <Typography sx={{ marginTop: "1em" }}>
          {startup.shortDescription}
        </Typography>
      </Card>
    </Grid>
  );
};

export default function StartupList(): ReactElement {
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    StartupHttpService.getStartups().then((res) => {
      setStartups(res);
    });
  }, []);

  return (
    <div id="startup-list">
      <Grid container direction="column" spacing={2}>
        {(!startups || startups.length === 0) && (
          <Alert severity="warning">No startups found!</Alert>
        )}
        {startups.length !== 0 &&
          startups.map((startup) => <StartupCard startup={startup} />)}
      </Grid>
    </div>
  );
}
