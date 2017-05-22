package com.hrmsys.action;

import java.io.File;
import java.io.IOException;
import java.util.List;


import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import com.hrmsys.bean.EmployeeBean;
import com.hrmsys.model.Department;
import com.hrmsys.model.EmpSalary;
import com.hrmsys.model.EmpSubsidy;
import com.hrmsys.model.Employee;
import com.hrmsys.model.Job;
import com.hrmsys.model.User;
import com.hrmsys.service.EmpSalaryService;
import com.hrmsys.service.EmpService;
import com.hrmsys.util.FileUtil;

public class EmpAction extends BaseAction{
	private EmpService empService;
	private Employee emp;
	private List<EmployeeBean> empBeans;
	private String deptId = null;
	private String jobId  = null;
	private String empPhoto = null;
	/**
	 * 查询条件
	 */
	private String condition;
	/**
	 * 保存的路径
	 */
	private String savePath; 
	/**
	 * 上传的文件内容 
	 */
	private File image;
	/**
	 * 保存的文件名
	 */
	private String imageFileName;
	/**
	 * 上传的文件种类
	 */
	private String imageContentType;
	private String uploadContentType;
	private String empId;
	private String roleId;
	private String ids;
	private String page;
	private String rows;
	
	
	/************方法**********************************************/
	/**
	 * 清单
	 */
	public void list(){
		String json = null;
		json = empService.getAll(page, rows);
		this.out(json);
	}
	/**
	 * 一键搜
	 */
	public void listByCondition(){
		String json = empService.listByCondition(condition, page, rows);
		this.out(json);
	}
	/**
	 * 保存员工信息、福利配置信息
	 */
	public void save(){
		String deptId = this.getRequest().getParameter("deptId");
		String deptName = this.getRequest().getParameter("deptName");
		String jobId = this.getRequest().getParameter("jobId");
		if(this.emp.getEmpPhoto().indexOf("img02.png") > 0){
			this.emp.setEmpPhoto("http://localhost:8090/picture/LOL/img02.png");
		}
		this.emp.setDepartment(new Department(deptName, deptId));
		this.emp.setJob(new Job(Integer.parseInt(jobId)));
		log.info("save start....");
		log.info(this.getEmpPhoto());
		String msg = "保存失败";
		msg = empService.save(emp);
		this.out("{\"success\": true, \"msg\":\""  + msg + "\"}");
	}
	/**
	 * 员工头像上传
	 */
	public String upload() throws IOException{
		String saveDir = FileUtil.getFileDir(this.getRequest());
		String newFilePath = saveDir + File.separatorChar + empId + ".png";
		//待上传的新图像
		File newFile = new File(newFilePath);
		if(newFile.exists()){
			newFile.delete();
		}
		
		FileUtils.copyFile(image, newFile);
//		System.out.println(saveDir);
		if(Integer.parseInt(roleId) == 1){
			return "emp";
		}
		if(Integer.parseInt(roleId) == 2){
			return "manager";
		}
		if(Integer.parseInt(roleId) == 3){
			return "hr";
		}
		if(Integer.parseInt(roleId) == 4){
			return "boss";
		}
		return "";
	}
	
	
	/**
	 * 根据工号判断是否存在此员工
	 */
	public void isExist(){
		String empName = empService.isExistByEmpId(empId);
		this.out(empName);
	}
	
	public void unique(){
		String emp = empService.unique(empId);
		this.out(emp);
	}
	
	public void getVac(){
		String vac = empService.getVac(empId);
		this.out(vac);
	}
	 
	public void delete(){
		String filePath = "F:\\Program Files\\Apache Software Foundation\\Tomcat 6.0\\webapps\\picture\\LOL";
		String msg = empService.delete(ids, filePath);
		this.out("{\"success\": true, \"msg\":\""  + msg + "\"}");
	}
	
	public void intoUpdate(){
		String empJson = empService.listByEmpId(empId);
		this.out(empJson);
	}
	
	public void getMaxId(){
		String Id = empService.getMaxId();
		this.out(Id);
	}

	
	/**
	 * 导出员工简单信息Excel
	 */
	public void detailXlsExport(){
		empService.xlsExport(this.getResponse(), "员工信息.xls");
	}
	
	
	/*********getter and setter ***********/
	public EmpService getEmpService() {
		return empService;
	}

	public void setEmpService(EmpService empService) {
		this.empService = empService;
	}

	public String getDeptId() {
		return deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public Employee getEmp() {
		return emp;
	}

	public void setEmp(Employee emp) {
		this.emp = emp;
	}
	public String getJobId() {
		return jobId;
	}
	public void setJobId(String jobId) {
		this.jobId = jobId;
	}
	public String getSavePath() {
		//struts.xml中配置savePath参数,且获取文件夹的真实地址
		return ServletActionContext.getRequest().getRealPath(savePath);
	}
//	public void setSavePath(String savePath) {
//		this.rePath = savePath;
//		this.savePath = savePath;
//	}
	public File getImage() {
		return image;
	}
	public void setImage(File image) {
		this.image = image;
	}
	public String getImageFileName() {
		return imageFileName;
	}
	public void setImageFileName(String imageFileName) {
		this.imageFileName = imageFileName;
	}
	public String getUploadContentType() {
		return uploadContentType;
	}
	public void setUploadContentType(String uploadContentType) {
		this.uploadContentType = uploadContentType;
	}
	public String getEmpPhoto() {
		return empPhoto;
	}
	public void setEmpPhoto(String empPhoto) {
		this.empPhoto = empPhoto;
	}
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public String getIds() {
		return ids;
	}
	public void setIds(String ids) {
		this.ids = ids;
	}
	public List<EmployeeBean> getEmpBeans() {
		return empBeans;
	}
	public void setEmpBeans(List<EmployeeBean> empBeans) {
		this.empBeans = empBeans;
	}
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public String getRows() {
		return rows;
	}
	public void setRows(String rows) {
		this.rows = rows;
	}
	
	public String getImageContentType() {
		return imageContentType;
	}
	public void setImageContentType(String imageContentType) {
		this.imageContentType = imageContentType;
	}
//	public SubsidyService getSubsidyService() {
//		return subsidyService;
//	}
//	public void setSubsidyService(SubsidyService subsidyService) {
//		this.subsidyService = subsidyService;
//	}
//	public void setEmpSalaryService(EmpSalaryService empSalaryService) {
//		this.empSalaryService = empSalaryService;
//	}
//	public EmpSalaryService getEmpSalaryService() {
//		return empSalaryService;
//	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
}
