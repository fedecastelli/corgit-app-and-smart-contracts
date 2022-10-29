import React, {useEffect, useMemo, useState} from 'react';
import {Avatar, Box, Button, TextField, Typography} from "@mui/material";
import {PullRequest, PullRequestContributor} from "../../../utils/ProjectTypes/Project.types";
import SingleContributorLine from "./SingleContributorLine";
import {theme} from "../../../GlobalStyles";

/**
 *
 * @param {React.PropsWithChildren<IRewardPullRequestViewer>} props
 * @return {JSX.Element}
 * @constructor
 */
const RewardPullRequestViewer: React.FC<IRewardPullRequestViewer> = (props) => {

  const [contributorRewards, setContributorRewards] = useState<{ c: PullRequestContributor, amount: string }[]>([]);


  useEffect(() => {
    let newContributorsRewards = props.pullRequest.contributors.map((c) => ({
      c, amount: "0"
    }));
    setContributorRewards(newContributorsRewards);
  }, [props.pullRequest]);

  const editContributorReward = (pos: number, amount: string) => {
    let cr = contributorRewards;
    cr[pos].amount = amount;
    setContributorRewards(JSON.parse(JSON.stringify(cr)));
  }

  const totalAmount = useMemo(() => {
    return contributorRewards.reduce((a,b) => a+parseInt(b.amount ? b.amount : "0"), 0);
  }, [contributorRewards]);

  return (
    <Box display={"flex"} flexDirection={"column"} sx={{width: "100%"}}>
      <Typography variant="h3">{props.pullRequest.title}</Typography>
      <Typography variant="body1">Closed {props.pullRequest.closedAt}</Typography>
      <Typography variant="body2" sx={{mt: 2, mb: 4}}>
        Total of <strong>{props.pullRequest.contributors.length} contributors</strong>
      </Typography>
      {
        contributorRewards.map((c, i) =>
          <SingleContributorLine key={i}
                                 contributor={c.c}
                                 contributorReward={c.amount}
                                 editReward={(newAmount: string) => {editContributorReward(i, newAmount)}}/>
        )
      }

      {/* TOTAL */}
      {
        props.pullRequest.contributors.length > 0 ?
          <Box display={"flex"} width="100%"
               sx={{
                 borderTop: `1px solid ${theme.palette.text.secondary}`,
                 justifyContent: "space-between",
                 alignItems: "center",
                 mt: 2, pt: 2
          }}>
            <Box sx={{flexGrow: 10, pl: 1}}>
              <Typography variant="h4">TOTAL</Typography>
            </Box>
            <Typography variant="h4">{totalAmount}</Typography>
            <Typography variant="body2" sx={{pl: 1}}>$cgTTP</Typography>
          </Box>
          :
          ""
      }

      {/* REWARD BUTTON */}
      {
        props.pullRequest.contributors.length > 0 ?
          <Box sx={{width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", pt: 4}}>
            <Button variant={"outlined"}
                    color="secondary"
                    sx={{textTransform: "none", width: 100}}>
              Cancel
            </Button>
            <Button variant={"contained"}
                    color="secondary"
                    sx={{color: "white", textTransform: "none", ml: 2, width: 100}}>
              Reward
            </Button>
          </Box>
          :
          ""
      }
    </Box>
  );
};

export interface IRewardPullRequestViewer {
  pullRequest: PullRequest
}

export default RewardPullRequestViewer;