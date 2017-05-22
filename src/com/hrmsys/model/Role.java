package com.hrmsys.model;

public class Role implements java.io.Serializable{
	private Integer roleId;
	private String roleName;
	private String remark;
	
	public Role() {
		// TODO Auto-generated constructor stub
	}
	
	public Role(Integer roleId, String roleName, String remark) {
		super();
		this.roleId = roleId;
		this.roleName = roleName;
		this.remark = remark;
	}


	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getRemark() {
		return remark;
	}
}
