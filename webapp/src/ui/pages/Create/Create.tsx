import React, {useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import CommonHeader from "../../organisms/Common.Header/Common.Header";
import CommonPageWrapper from "../../organisms/Common.PageWrapper/Common.PageWrapper";
import SingleCreateElement from "../../organisms/Common.PageWrapper/SingleCreateElement";
import {RocketLaunch} from "@mui/icons-material";

/**
 *
 * @param {React.PropsWithChildren<ICreate>} props
 * @return {JSX.Element}
 * @constructor
 */
const Create: React.FC<ICreate> = (props) => {

  const [projectName, setProjectName, ] = useState<string>("");
  const [projectSymbol, setProjectSymbol, ] = useState<string>("");
  const [projectPrevContRew, setProjectPrevContRew, ] = useState<string>("");

  return (
    <CommonPageWrapper>
      <Box>
        <Typography variant="h2">
          Create a new cgToken
        </Typography>
        <Typography variant="body1" sx={{mt: 1, mb: 2}}>
          Enter the details of your cgToken, then add a .cgToken.json file on your repository main root.
        </Typography>
        <SingleCreateElement name={"Name"}
                             description={"Enter the name of your project"}
                             value={projectName}
                             onChange={(e) => setProjectName(e.target.value)}/>
        <SingleCreateElement name={"Symbol"}
                             description={"Give a symbol to your project. This will be also the token symbol"}
                             value={projectSymbol}
                             onChange={(e) => setProjectSymbol(e.target.value)}/>
        <SingleCreateElement name={"Previous Contributors rewards "}
                             description={"Sets the percentage of value redistributed to your project contributors"}
                             value={projectPrevContRew}
                             isNumber={true}
                             onChange={(e) => setProjectPrevContRew(e.target.value)}/>

        <Button variant={"contained"}
                color="secondary"
                startIcon={<RocketLaunch />}
                sx={{color: "white", textTransform: "none", mt: 4}}>
          Create your cgToken
        </Button>

      </Box>
    </CommonPageWrapper>
  );
};

export interface ICreate {

}

export default Create;
