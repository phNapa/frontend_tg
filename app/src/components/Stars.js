import React from 'react'
import styled from 'styled-components/native';
import StartFull from '../assets/star.svg';
import StartHalf from '../assets/star_half.svg';
import StarEmpty from '../assets/star_empty.svg';
const StarArea = styled.View`
    flex-direction: row;
`;

const StarView = styled.View``;
const StarText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px;
    color: #737373;
`;

export default({stars, showNumber}) =>{

    let s = [0, 0, 0, 0, 0];
    let floor = Math.floor(stars);
    let left = stars - floor;

    for(var i=0;i<floor;i++) {
        s[i] = 2;
    }
    if(left > 0) {
        s[i] = 1;
    }
    
    

    return (
        <StarArea>
            {s.map((i, k)=>(
                <StarView key={k}>
                    {i === 0 && <StarEmpty width="14" height="14" fill="#FF9200" />}
                    {i === 1 && <StartHalf width="14" height="14" fill="#FF9200" />}
                    {i === 2 && <StartFull width="14" height="14" fill="#FF9200" />}
                </StarView>
            ))}
            {showNumber && <StarText>{stars}</StarText>}
        </StarArea>
    )
}