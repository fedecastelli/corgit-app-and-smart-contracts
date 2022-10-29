import React from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import {Check} from "@mui/icons-material";
import {ProjectUserContributionInterface} from "../../../hooks/useLoadProjectUserContributions";

/**
 *
 * @param {React.PropsWithChildren<IRewardLine>} props
 * @return {JSX.Element}
 * @constructor
 */
const RewardLine: React.FC<IRewardLine> = (props) => {
  return (
    <Grid container sx={{py: 0.5}} alignItems={"center"}>
      <Grid item xs={5}>
        <Typography variant="body1">{props.contribution.name}</Typography>
        <Typography fontSize={14} color="textSecondary">{props.contribution.creation}</Typography>
      </Grid>
      <Grid item xs={5} sx={{textAlign: "right"}}>
        <Typography variant="h4">{props.contribution.amount} $cgTTP</Typography>
      </Grid>
      <Grid item xs={2} sx={{textAlign: "right"}}>
        {
          props.contribution.paid ?
            <Box display={"flex"} justifyContent={"flex-end"}>
              <Typography sx={{fontSize: 16, mr: 0.5}}>Claimed</Typography>
              <Check color={"success"}/>
            </Box>
            :
            <Button variant={"contained"}
                    color="secondary"
                    sx={{color: "white", textTransform: "none", ml: 2}}>
              Claim
            </Button>
        }

      </Grid>
    </Grid>
  );
};

export interface IRewardLine {
  contribution: ProjectUserContributionInterface
}

export default RewardLine;
