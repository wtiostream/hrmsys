package com.hrmsys.model;

public class EmpSalary implements java.io.Serializable{
	private int SalaryId;
	private String EmpName;
	private String EmpId;
	private Job job;
	private String DeptId;
	private EmpSubsidy empSubsidy;
	
	public EmpSalary() {
		// TODO Auto-generated constructor stub
	}
	
	public EmpSalary(int salaryId, String empName, String empId, Job job,
			String deptId, EmpSubsidy empSubsidy) {
		super();
		SalaryId = salaryId;
		EmpName = empName;
		EmpId = empId;
		this.job = job;
		DeptId = deptId;
		this.empSubsidy = empSubsidy;
	}

	public int getSalaryId() {
		return SalaryId;
	}

	public void setSalaryId(int salaryId) {
		SalaryId = salaryId;
	}

	public String getEmpName() {
		return EmpName;
	}

	public void setEmpName(String empName) {
		EmpName = empName;
	}

	public String getEmpId() {
		return EmpId;
	}

	public void setEmpId(String empId) {
		EmpId = empId;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	public String getDeptId() {
		return DeptId;
	}

	public void setDeptId(String deptId) {
		DeptId = deptId;
	}

	public EmpSubsidy getEmpSubsidy() {
		return empSubsidy;
	}

	public void setEmpSubsidy(EmpSubsidy empSubsidy) {
		this.empSubsidy = empSubsidy;
	}
	
	
}
