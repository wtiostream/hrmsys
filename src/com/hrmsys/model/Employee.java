package com.hrmsys.model;


import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Employee entity. @author MyEclipse Persistence Tools
 */

public class Employee implements java.io.Serializable {

	// Fields
	private Job job;
	private Department department;
	private String empId;
	private String empName;
	private Integer empSex;
	private Date empBirth;
	private String empAddress;
	private String empTelephone;
	private String empIdcard;
	private String empPhoto;
	private Date empAddDate;
	private String empAddPerson;
	private String empSchool;
	private String empEducation;
	private String empProfession;
	private String empOrigin;
	private int empVacation;
	// Constructors

	/** default constructor */
	public Employee() {
	}

	/** minimal constructor */
	public Employee(String empId,Department department, String empName,
			Integer empSex, Date empBirth, String empAddress, String empPost,
			String empMobilephone, String empEmail, String empAccount,
			String empIdcard, Date empAddDate, String empAddPerson,
			String empBank) {
		this.empId = empId;
		this.department = department;
		this.empName = empName;
		this.empSex = empSex;
		this.empBirth = empBirth;
		this.empAddress = empAddress;
		this.empIdcard = empIdcard;
		this.empAddDate = empAddDate;
		this.empAddPerson = empAddPerson;
	}

	
	public Employee(Job job, Department department, String empId,
			String empName, Integer empSex, Date empBirth, String empAddress,
			String empTelephone, String empIdcard, String empPhoto,
			Date empAddDate, String empAddPerson, String empSchool,
			String empEducation, String empProfession, String empOrigin) {
		super();
		this.job = job;
		this.department = department;
		this.empId = empId;
		this.empName = empName;
		this.empSex = empSex;
		this.empBirth = empBirth;
		this.empAddress = empAddress;
		this.empTelephone = empTelephone;
		this.empIdcard = empIdcard;
		this.empPhoto = empPhoto;
		this.empAddDate = empAddDate;
		this.empAddPerson = empAddPerson;
		this.empSchool = empSchool;
		this.empEducation = empEducation;
		this.empProfession = empProfession;
		this.empOrigin = empOrigin;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empId) {
		this.empId = empId;
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	public Integer getEmpSex() {
		return empSex;
	}

	public void setEmpSex(Integer empSex) {
		this.empSex = empSex;
	}

	public Date getEmpBirth() {
		return empBirth;
	}

	public void setEmpBirth(Date empBirth) {
		this.empBirth = empBirth;
	}

	public String getEmpAddress() {
		return empAddress;
	}

	public void setEmpAddress(String empAddress) {
		this.empAddress = empAddress;
	}

	public String getEmpTelephone() {
		return empTelephone;
	}

	public void setEmpTelephone(String empTelephone) {
		this.empTelephone = empTelephone;
	}

	public String getEmpIdcard() {
		return empIdcard;
	}

	public void setEmpIdcard(String empIdcard) {
		this.empIdcard = empIdcard;
	}

	public String getEmpPhoto() {
		return empPhoto;
	}

	public void setEmpPhoto(String empPhoto) {
		this.empPhoto = empPhoto;
	}

	public Date getEmpAddDate() {
		return empAddDate;
	}

	public void setEmpAddDate(Date empAddDate) {
		this.empAddDate = empAddDate;
	}

	public String getEmpAddPerson() {
		return empAddPerson;
	}

	public void setEmpAddPerson(String empAddPerson) {
		this.empAddPerson = empAddPerson;
	}

	public String getEmpSchool() {
		return empSchool;
	}

	public void setEmpSchool(String empSchool) {
		this.empSchool = empSchool;
	}

	public String getEmpEducation() {
		return empEducation;
	}

	public void setEmpEducation(String empEducation) {
		this.empEducation = empEducation;
	}

	public String getEmpProfession() {
		return empProfession;
	}

	public void setEmpProfession(String empProfession) {
		this.empProfession = empProfession;
	}
	public String getEmpOrigin() {
		return empOrigin;
	}
	
	public void setEmpOrigin(String empOrigin) {
		this.empOrigin = empOrigin;
	}
	public int getEmpVacation() {
		return empVacation;
	}
	public void setEmpVacation(int empVacation) {
		this.empVacation = empVacation;
	}

}