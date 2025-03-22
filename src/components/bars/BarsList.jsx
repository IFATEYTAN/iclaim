import React from 'react';
import { Edit, Trash, MoreHorizontal } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Button } from '../ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { formatDate } from '../../lib/utils';

const BarsList = ({ bars, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-16 bg-muted animate-pulse rounded-md" />
        ))}
      </div>
    );
  }
  
  if (bars.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">לא נמצאו ברים.</p>
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>שם</TableHead>
          <TableHead>כתובת</TableHead>
          <TableHead>איש קשר</TableHead>
          <TableHead>טלפון</TableHead>
          <TableHead>תאריך הצטרפות</TableHead>
          <TableHead className="text-right">פעולות</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bars.map((bar) => (
          <TableRow key={bar.id}>
            <TableCell className="font-medium">{bar.name}</TableCell>
            <TableCell>{bar.address}</TableCell>
            <TableCell>{bar.contactPerson}</TableCell>
            <TableCell>{bar.phone}</TableCell>
            <TableCell>{formatDate(bar.joinDate)}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(bar)}>
                    <Edit className="mr-2 h-4 w-4" /> עריכה
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDelete(bar.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" /> מחיקה
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BarsList;
