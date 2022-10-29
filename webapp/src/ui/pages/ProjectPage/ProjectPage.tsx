import React, {useState} from 'react';
import CommonPageWrapper from "../../organisms/Common.PageWrapper/Common.PageWrapper";
import {Box, Button, Grid, Typography} from "@mui/material";
import {RocketLaunch} from "@mui/icons-material";
import ProjectSingleDetailCard from "../../atmos/Project.SingleDetailCard/Project.SingleDetailCard";
import ProjectUserRewardsList from "../../organisms/Project.UserRewardsList/Project.UserRewardsList";
import {useNavigate} from "react-router-dom";
import {RouteKey} from "../../../App.Routes";
import {useParams} from "react-router";
import ProjectAddCollateralDialog from "../../organisms/Project.AddCollateralDialog/Project.AddCollateralDialog";

/**
 *
 * @param {React.PropsWithChildren<IProjectPage>} props
 * @return {JSX.Element}
 * @constructor
 */
const ProjectPage: React.FC<IProjectPage> = (props) => {

  const [showAddCollateral, setShowAddCollateral] = useState<boolean>(false);
  const navigate = useNavigate();
  let { tokenAddress } = useParams();


  return (
    <CommonPageWrapper>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h1">Testing Project</Typography>
          <Typography variant="h2" sx={{mt: 1}}>$cgTTP</Typography>
          <Typography variant="body1" color="textSecondary">0xabcd...1246</Typography>
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <Button variant={"outlined"}
                  color="secondary"
                  sx={{textTransform: "none"}}
                  onClick={() => setShowAddCollateral(true)}
          >
            Add Collateral
          </Button>
          <Button variant={"contained"}
                  color="secondary"
                  sx={{color: "white", textTransform: "none", ml: 2}}
                  onClick={() => {navigate(`/project/${tokenAddress}/reward`)}}
          >
            Reward
          </Button>
        </Grid>
      </Grid>

      {/* Section of details */}
      <Grid container sx={{mt: 4}} spacing={2}>
        <Grid item xs={4}>
          <ProjectSingleDetailCard name={"Test"} value={"123,145"}/>
        </Grid>
        <Grid item xs={4}>
          <ProjectSingleDetailCard name={"Test"} value={"123,145"}/>
        </Grid>
        <Grid item xs={4}>
          <ProjectSingleDetailCard name={"Test"} value={"123,145"}/>
        </Grid>
        <Grid item xs={4}>
          <ProjectSingleDetailCard name={"Test"} value={"123,145"}/>
        </Grid>
        <Grid item xs={4}>
          <ProjectSingleDetailCard name={"Test"} value={"123,145"}/>
        </Grid>
        <Grid item xs={4}>
          <ProjectSingleDetailCard name={"Test"} value={"123,145"}/>
        </Grid>
      </Grid>

      {/*  Section of unclaimed rewards*/}
      <Box mt={6}>
        <Typography variant={"h2"}>Your unclaimed rewards</Typography>
        <Box mt={2}>
          <ProjectUserRewardsList/>
        </Box>
      </Box>

      {/* Dialog to add collateral */}
      <ProjectAddCollateralDialog show={showAddCollateral} close={() => {setShowAddCollateral(false)}}/>
    </CommonPageWrapper>
  );
};

export interface IProjectPage {

}

export default ProjectPage;
