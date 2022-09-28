import { Component,Inject,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from'@angular/material/dialog';
import { DialogRef} from'@angular/cdk/dialog';
// import { Inject } from '@angular/core';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  freshnesslist = ["Brand new", "Second Hand","ReFurbished"]
  ProductForm !:FormGroup;
  ActionBtn: string = "save"
constructor(private FormBuilder: FormBuilder,private api:ApiService, 
  @Inject(MAT_DIALOG_DATA) public editData: any,
  private dialogRef: MatDialogRef<DialogComponent>) { }

ngOnInit(): void {
this.ProductForm = this.FormBuilder.group({
  productName: ["",Validators.required],
  Category:[ "" , Validators.required],
  date:["", Validators.required],
  freshness:[ "",Validators.required],
  price:["" , Validators.required],
  Comment:["", Validators.required]
  })
  // console.log (this.editData);
  if (this.editData){
        this.ActionBtn = "update"
    this.ProductForm.controls["productName"].setValue(this.editData.productName)
    this.ProductForm.controls["Category"].setValue(this.editData.Category)
    this.ProductForm.controls["date"].setValue(this.editData.date)
    this.ProductForm.controls["freshness"].setValue(this.editData.freshness)
    this.ProductForm.controls["price"].setValue(this.editData.price)
    this.ProductForm.controls["Comment"].setValue(this.editData.Comment)
  }

}
addProduct(){
  if (!this.editData)
  {
    if(this.ProductForm.value){
      this.api.postProduct(this.ProductForm.value)
      .subscribe({
        next: (res)=>{
          alert("product added Successfully");
          this.ProductForm.reset();
          this.dialogRef.close("save");
  
        },
        error:()=>{
          alert("error while adding the product")
        }
        
      })
    }
  }
  else {
    this.upadteproduct()
  }
  
  // console.log(this.ProductForm.value);
  
}
upadteproduct(){
  this.api.putproduct(this.ProductForm.value,this.editData.id)
  .subscribe({
    
    next:(res)=>{
      // alert(message?:any): void
    alert ("product updated successfully")
    this.ProductForm.reset();
    this.dialogRef.close("update");
  },
  error:()=>{
    alert("Error while updating the  record");
  }
  
  })
}
}