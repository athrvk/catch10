import React, {Component} from 'react';
import {Box, CardContent, Typography} from "@mui/material";
import {assignPlace} from "../utils/utils";

class ScoreBoard extends Component {

    nonNull = (val, index, handCount) => handCount ?
        (val && val[index] && val[index].handCount) || 0:
        (val && val[index] && val[index].tensCount) || 0;

    render() {
        const {handCounts, playersInOrder, user, username} = this.props;

        let handsInOrder = null;

        if (handCounts && handCounts.length > 0) {
            const pNHandCount = handCounts.filter(player => player.place === 'NORTH')[0];
            const pEHandCount = handCounts.filter(player => player.place === 'EAST')[0];
            const pSHandCount = handCounts.filter(player => player.place === 'SOUTH')[0];
            const pWHandCount = handCounts.filter(player => player.place === 'WEST')[0];

            handsInOrder =  assignPlace(user.place, pNHandCount, pEHandCount, pSHandCount, pWHandCount)
        }

        return (
            <div>
                <Box sx={{
                    width: 300,
                    height: 300,
                    zIndex: 'tooltip',
                    position: 'absolute',
                    left: '-60%',
                }}>
                    <CardContent>
                        <Typography color="text.primary" variant="h5" gutterBottom>
                            Team: {playersInOrder[0].username} & {username}
                        </Typography>
                        <Typography color="text.secondary" variant="h6" component="div">
                            Hands: {this.nonNull(handsInOrder, 0, true) + this.nonNull(handsInOrder, 2, true)}
                        </Typography>
                        <Typography color="text.secondary" variant="h6" component="div">
                            10's caught: {this.nonNull(handsInOrder, 0) + this.nonNull(handsInOrder, 2)}
                        </Typography>
                    </CardContent>
                </Box>
                <Box sx={{
                    width: 300,
                    height: 300,
                    zIndex: 'tooltip',
                    position: 'absolute',
                    right: '-60%',
                }}>
                    <CardContent>
                        <Typography color="text.primary" variant="h5" gutterBottom>
                            Team: {playersInOrder[3].username} & {playersInOrder[1].username}
                        </Typography>
                        <Typography color="text.secondary" variant="h6" component="div">
                            Hands: {this.nonNull(handsInOrder, 3, true) + this.nonNull(handsInOrder, 1, true)}
                        </Typography>
                        <Typography color="text.secondary" variant="h6" component="div">
                            10's caught: {this.nonNull(handsInOrder, 3) + this.nonNull(handsInOrder, 1)}
                        </Typography>
                    </CardContent>
                </Box>
            </div>
        );
    }
}

export default ScoreBoard;