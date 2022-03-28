import { Accordion, AccordionDetails, AccordionSummary, List, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface CollapsibleListProps {
    /**
     * Header Text of the List. Can be pressed to expand the List.
     * This needs to be unique on the page.
     */
    uniqueHeader: string;
    /**
     * Message to be displayed when the list is empty
     */
    emptyMessage?: string;
    /**
     * List elements to be displayed. Need to be <li> elements
     */
    listElements: JSX.Element[];
    /**
     * If set to true, List is expanded by default
     */
    defaultExpanded?: boolean;
}

export default function CollapsibleList({emptyMessage,listElements, uniqueHeader, defaultExpanded}:CollapsibleListProps) {
    return (
        <Accordion defaultExpanded={defaultExpanded} disableGutters={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${uniqueHeader.replace(" ", "")}-content`}
            id={`${uniqueHeader.replace(" ", "")}-header`}
          >
            <Typography>{uniqueHeader}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {listElements.length > 0 ? (
              <List>{listElements}</List>
            ) : (
              <Typography>
                {emptyMessage}
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      )
}