package com.hrmsys.util;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;


import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.hrmsys.bean.EmployeeBean;

public class FileExport {
	/*
	 * jasperReport导出Excel 此方式导出的excel没有网格线(好像直接用流导出方式都没有)
	 * 在此直接用poi导出，当然jasperReport导出中也应用了poi(需要加入poi的jar包)
	 */
	public void exportXls(List<EmployeeBean> list, String filename, HttpServletResponse response) {
		//创建一工作空间
		HSSFWorkbook workbook = new HSSFWorkbook();
		//创建一表单
		HSSFSheet sheet = workbook.createSheet(filename);
		//创建表题行
		HSSFRow headerRow = sheet.createRow(0);
		for(int i = 0; i < 20; i++){
			HSSFCell headerCell  = headerRow.createCell(i);
			switch(i){
			case 0 :
				headerCell.setCellValue("员工工号"); break;
			case 1 :
				headerCell.setCellValue("员工姓名"); break;
			case 2 :
				headerCell.setCellValue("性别"); break;
			case 3 :
				headerCell.setCellValue("出生日期"); break;
			case 4 :
				headerCell.setCellValue("地址"); break;
			case 5:
				headerCell.setCellValue("邮编"); break;
			case 6 :
				headerCell.setCellValue("手机"); break;
			case 7 :
				headerCell.setCellValue("电话"); break;
			case 8 :
				headerCell.setCellValue("QQ"); break;
			case 9 :
				headerCell.setCellValue("email"); break;
			case 10 :
				headerCell.setCellValue("银行账号"); break;
			case 11 :
				headerCell.setCellValue("身份证号"); break;
			case 12 :
				headerCell.setCellValue("部门"); break;
			case 13 :
				headerCell.setCellValue("职位"); break;
			case 14 :
				headerCell.setCellValue("国籍"); break;
			case 15 :
				headerCell.setCellValue("籍贯"); break;
			case 16 :
				headerCell.setCellValue("民族"); break;
			case 17 :
				headerCell.setCellValue("毕业学校"); break;
			case 18 :
				headerCell.setCellValue("学历"); break;
			case 19 :
				headerCell.setCellValue("专业"); break;
			}
			}
			for(int i = 0; i < list.size(); i++){
				HSSFRow row = sheet.createRow(i+1);
				EmployeeBean empBean = list.get(i);
				HSSFCell empIdCell = row.createCell(0);
				empIdCell.setCellValue(empBean.getEmpId());
				HSSFCell empNameCell = row.createCell(1);
				empNameCell.setCellValue(empBean.getEmpName());
				HSSFCell empSexCell = row.createCell(2);
				empSexCell.setCellValue(empBean.getEmpSex());
				HSSFCell empBirthCell = row.createCell(3);
				empBirthCell.setCellValue(empBean.getEmpBirth());
				HSSFCell empAddressCell = row.createCell(4);
				empAddressCell.setCellValue(empBean.getEmpAddress());
				HSSFCell empPostCell = row.createCell(5);
				empPostCell.setCellValue(empBean.getEmpPost());
				HSSFCell empTelephoneCell = row.createCell(6);
				empTelephoneCell.setCellValue(empBean.getEmpTelephone());
				HSSFCell empMobilephoneCell = row.createCell(7);
				empMobilephoneCell.setCellValue(empBean.getEmpMobilephone());
				HSSFCell empQqphoneCell = row.createCell(8);
				empQqphoneCell.setCellValue(empBean.getEmpQq());
				HSSFCell empEmailCell = row.createCell(9);
				empEmailCell.setCellValue(empBean.getEmpEmail());
				HSSFCell empAccountCell = row.createCell(10);
				empAccountCell.setCellValue(empBean.getEmpAccount());
				HSSFCell empIdcardCell = row.createCell(11);
				empIdcardCell.setCellValue(empBean.getEmpIdcard());
				HSSFCell deptCell = row.createCell(12);
				deptCell.setCellValue(empBean.getDept());
				HSSFCell jobCell = row.createCell(13);
				jobCell.setCellValue(empBean.getJob());
				HSSFCell empNationalityCell = row.createCell(14);
				empNationalityCell.setCellValue(empBean.getEmpNationality());
				HSSFCell empOriginCell = row.createCell(15);
				empOriginCell.setCellValue(empBean.getEmpOrigin());
				HSSFCell empNationCell = row.createCell(16);
				empNationCell.setCellValue(empBean.getEmpNation());
				HSSFCell empSchoolCell = row.createCell(17);
				empSchoolCell.setCellValue(empBean.getEmpSchool());
				HSSFCell empEducationCell = row.createCell(18);
				empEducationCell.setCellValue(empBean.getEmpEducation());
				HSSFCell empProfessionCell = row.createCell(19);
				empProfessionCell.setCellValue(empBean.getEmpProfession());
			}
			response.setContentType("application/xls");
			ServletOutputStream sos = null;
			try {
				response.setHeader("Content-Disposition", "attachment;filename="
						+ new String(filename.getBytes(), "ISO8859-1"));
				sos = response.getOutputStream();
				workbook.write(sos);
			} catch (Exception e) {
				e.printStackTrace();
			}finally{
				if(sos != null){
					try {
						sos.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
}
