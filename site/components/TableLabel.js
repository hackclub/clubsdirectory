import React from 'react'
import { Card, Grid } from 'theme-ui'

export const TableLabel = ({undefined}) => (
	          <Card
          as={'div'}
          variant="sunken"
          sx={{p: [1,2]}}
          mb={2}
          
          >
            <Grid
              columns={[null, "1.5fr 1.5fr 1.5fr 1.5fr 1fr"]} 
              gap={3}
              sx={{pl: [1,3], pr: [1,3]}} 
            >
            
              <p>Club Name</p>
              <p>School</p>
              <p>Location</p>
              <p>Leader(s)</p>
            </Grid>

          </Card>
)
