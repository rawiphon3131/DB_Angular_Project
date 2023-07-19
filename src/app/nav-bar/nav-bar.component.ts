import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService} from 'primeng/api'
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [ConfirmationService]
})
export class NavBarComponent implements OnInit {
  username: string | null = null;
  userFname: string | null = null;
  userLname: string | null = null;
  userId: string | null = null;
  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined;

  constructor(private router: Router,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.userFname = sessionStorage.getItem('user_fname');
    this.userLname = sessionStorage.getItem('user_lname');
    this.userId = sessionStorage.getItem('user_id');
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar', 
        command:()=>this.navDashboard(),
      },
      {
          label: 'คลังสินค้า',
          icon: 'pi pi-fw pi-box',
          items: [
              {
                  label: 'การรับเข้าสินค้า',
                  icon: 'pi pi-fw pi-cart-plus',
                  items:[
                    {
                      label: 'เพิ่มใบสั่งซื้อสินค้า',
                      icon: 'pi pi-fw pi-plus',
                      command:()=> this.navAddpo(),
                    },
                    {
                      label: 'สภานะใบสั่งซื้อ',
                      icon: 'pi pi-fw pi-check',
                      command:()=> this.stateOr(),
                    },
                    {
                      label: 'เพิ่มใบรับสินค้า',
                      icon: 'pi pi-fw pi-plus',
                      command:()=> this.navPickinPre(),
                    },
                    {
                      label: 'ประวัติการรับเข้าสินค้า',
                      icon: 'pi pi-check-circle',
                      command:()=> this.navHpc(),
                    },
                    {
                      label: 'เพิ่ม/ลบ/แก้ไข ข้อมูลร้านค้า',
                      icon: 'pi pi-fw pi-plus',
                      command:()=> this.navCpnc(),
                    }
                  ]
              },
              {
                  label: 'ข้อมูลสินค้ารายการสินค้า',
                  icon: 'pi pi-fw pi-info-circle',
                  items:[
                    {
                      label: 'เพิ่ม/ลบ/แก้ไข รายการสินค้า',
                      icon: 'pi pi-fw pi-file-edit',
                      command:()=> this.navPdst(),
                    },
                    {
                      label: 'เพิ่ม/ลบ/แก้ไข ข้อมูลไซต์',
                      icon: 'pi pi-fw pi-file-edit',
                      command:()=> this.navSize(),
                    },
                    {
                      label: 'เพิ่ม/ลบ/แก้ไข ข้อมูลประเภทสินค้า',
                      icon: 'pi pi-fw pi-file-edit',
                    }
                  ],
              },{
                label: 'รายการสินค้าทั้งหมด',
                icon: 'pi pi-fw pi-box',
                command:()=> this.navTtpd(),
              }
          ]
      },
      {
          label: 'ร้านค้า',
          icon: 'pi pi-fw pi-shopping-cart',
          items: [
              {
                  label: 'ข้อมูลลูกค้า',
                  icon: 'pi pi-fw pi-info-circle',
                  items:[
                    {
                      label: 'เพิ่ม/ลบ/แก้ไข ข้อมูลลูกค้า',
                      icon: 'pi pi-fw pi-user-edit',
                      command:()=> this.navCtmif(),
                      
                    }
                  ]
              },
              {
                  label: 'เพิ่มคำสั่งซื้อสินค้า',
                  icon: 'pi pi-fw pi-cart-plus',
                  command:()=> this.addns(),
              }
          ]
      },
      {
          label: 'สรุปยอด',
          icon: 'pi pi-fw pi-print',
          items: [
              {
                  label: 'สรุปยอดขาย',
                  icon: 'pi pi-fw pi-print'
              },
              {
                  label: 'สรุปยอดค้างชำระ',
                  icon: 'pi pi-fw pi-print'
              }
          ]
      },
      {
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off',
          command: () => this.logout(),
      }
  ];
  }
  navCtmif(){
    this.router.navigate(['ctmif']);
  }
  navTtpd(){
    this.router.navigate(['ttpd']);
  }
  addns(){
    this.router.navigate(['addns']);
  }
  navPdst(){
    this.router.navigate(['pdst']);
  }
  navHpc(){
    this.router.navigate(['hpc']);
  }
  navSize(){
    this.router.navigate(['size']);
  }
  navCpnc(){
    this.router.navigate(['cpnc']);
  }
  navPickinPre(){
    this.router.navigate(['pickinPre']);
  }
  navAddpo(){
    this.router.navigate(['addpo']);
  }
  navDashboard(){
    this.router.navigate(['dashboard']);
  }
  stateOr(){
    this.router.navigate(['stateOrder']);
  }
  logout(): void {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('user_fname');
        sessionStorage.removeItem('user_lname');
        sessionStorage.removeItem('user_id');
        this.router.navigate(['login']);
  }
}
