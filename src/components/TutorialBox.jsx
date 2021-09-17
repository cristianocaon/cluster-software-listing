import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Grow from '@material-ui/core/Grow';
import HelpIcon from '@material-ui/icons/Help';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    box: {
        backgroundColor: '#e7ecef',
        color: '#4a4e69',
        margin: '1rem',
        marginLeft: '15rem',
        marginRight: '15rem',
        padding: '1rem',
    },
}));

export default function TutorialBox({ clicked }) {
    const classes = useStyles();

    return (
        <Grow in={true} timeout={1000}>
            <Card className={classes.box} elevation={3}>
                <Typography>
                    HPCC users may find the most up-to-date list of available
                    software packages and dependencies on the RedRaider cluster
                    on this web page:
                    <ol>
                        <li>Select the target partition from the top menu.</li>
                        <ul>
                            <li>
                                <span style={{ color: '#d90429' }}>
                                    For more details regarding each partition on
                                    the RedRaider cluster, click{' '}
                                    <a
                                        href="https://www.depts.ttu.edu/hpcc/operations/equipment.php"
                                        target="_blank"
                                    >
                                        here
                                    </a>
                                    .
                                </span>
                            </li>
                        </ul>
                        <li>
                            Choose the desired independent software package or
                            compiler from the first level of the stack.
                        </li>
                        <ul>
                            <li>
                                The description box will appear for the selected
                                package at the bottom-left of this page.
                            </li>
                            <li>
                                You will have a choice to select the preferred
                                version(s) of the software/compiler from the
                                next level on the stack.
                            </li>
                            <li>
                                The bottom-right box shows more details
                                regarding the software modules.
                            </li>
                            <li>
                                <span style={{ color: '#d90429' }}>
                                    For more info on how to use Modules, please
                                    refer to the{' '}
                                    <a
                                        href="https://www.depts.ttu.edu/hpcc/userguides/general_guides/software_environment.php"
                                        target="_blank"
                                    >
                                        Software Environment Setup Guide
                                    </a>
                                </span>
                            </li>
                        </ul>
                        <li>
                            If dependent software packages are available, they
                            will show up at the next level on the software
                            stack.
                            <ul>
                                <li>If applicable, follow steps 2 and 3.</li>
                            </ul>
                        </li>
                    </ol>
                    Alternatively, you can use the search box at the top to look
                    for a particular software package under the selected
                    partition.
                    <ul>
                        <li>
                            If the desired software package exists, it will show
                            up in the result area.
                        </li>
                        <li>
                            Commonly, results may show the different versions of
                            the same software package built by various
                            compilers.{' '}
                        </li>
                        <li>
                            The full path to the software package on the stack
                            list will be marked as selected by clicking on the
                            results.{' '}
                        </li>
                    </ul>
                    If your desired software package or a specific software
                    version did not show up here, you may follow the
                    instructions on the{' '}
                    <a
                        href="https://www.depts.ttu.edu/hpcc/operations/requestsoftware.php"
                        target="_blank"
                    >
                        Request Software
                    </a>{' '}
                    web page and place your new software request. Please note
                    that HPCC policies and restrictions on software installation
                    described in this link apply to all new software requests.
                    <p>
                        To see these information again, click on the{' '}
                        <HelpIcon style={{ fontSize: 'medium' }} /> button in
                        the partition header at the top.
                    </p>
                </Typography>
            </Card>
        </Grow>
    );
}
