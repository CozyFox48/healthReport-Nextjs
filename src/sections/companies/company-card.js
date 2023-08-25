import PropTypes from 'prop-types';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import {  Card, CardContent, Divider, Stack, SvgIcon, Button, Typography } from '@mui/material';
import { FileContext } from '../../utils/FileContext';
import { useContext } from 'react';
import config from "./../../../global.config";
import axios from "axios";

export const CompanyCard = (props) => {
  const { selectedFile, setSelectedFile, setSelectedContent } = useContext(FileContext);

  const { company } = props;
  const analysisFile = async (file) => {
    try {
      setSelectedFile(file);
      const response = await axios.get(config.url + '/file?fileName=' + file);
      const data = response.data;
      setSelectedContent(data.result);
    } catch (error) {
      console.error('Error fetching file:', error.response.status);
    }
  }
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Typography
          align="center"
          color={selectedFile === company ? 'grey' : ""}
          gutterBottom
          variant="h6"
        >
          {company}
        </Typography>
      </CardContent>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {company.slice(3, 5)}/{company.slice(5, 7)}/{company.slice(7, 11)}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
        >
          {selectedFile === company ? <Button variant="contained"
            disabled
            onClick={() => analysisFile(company)}>
            Selected
          </Button> : <Button variant="contained"
            onClick={() => analysisFile(company)}>
            Select
          </Button>}
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.string
};
